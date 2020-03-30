import React from "react";
import { useStoreState } from "easy-peasy";
import Table from "react-bootstrap/Table";
import getRanking from "./ranking";
import Row from "./Row";
import SegmentLink from "./SegmentLink";
import HeaderRow from "./HeaderRow";
import { getSortingMode } from "./sorting";
import { allSegments } from "./data/segments";

const Scoreboard = props => {
  const { sortingMode, segments, dateRange, clicked, setClicked } = props;

  const state = useStoreState(state => state);

  const storeSegments = state.segments;
  const allTime = state.athleteEfforts[dateRange];
  const leaderboardsAllTime = state.segmentLeaderboards[dateRange];

  const flipClicked = () => setClicked(!clicked);

  const segmentRowMapper = clicked =>
    segments.map(segId => {
      const numAthletes = leaderboardsAllTime[segId]
        ? leaderboardsAllTime[segId].length
        : "";
      const providedName = allSegments[segId] && allSegments[segId].name;
      const stravaName = storeSegments[segId] && storeSegments[segId].name;

      return (
        <SegmentLink
          key={segId}
          segmentId={segId}
          numAthletes={numAthletes}
          realSegmentName={stravaName}
          providedSegmentName={providedName}
          distance={storeSegments[segId] && storeSegments[segId].distance}
          averageGrade={
            storeSegments[segId] && storeSegments[segId].average_grade
          }
          clicked={clicked}
        />
      );
    });

  const ranking = getRanking(allTime, segments, leaderboardsAllTime).sort(
    getSortingMode(sortingMode, segments, allTime)
  );

  const dataRows = ranking.map(({ athleteName, score, rankPos }, ind) => (
    <Row
      key={athleteName}
      args={[athleteName, score, allTime[athleteName], segments, rankPos]}
      clicked={clicked}
      flipClicked={() => flipClicked()}
    />
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <HeaderRow segmentRowMapper={segmentRowMapper} />
      </thead>
      <tbody>{dataRows}</tbody>
    </Table>
  );
};

export default Scoreboard;
