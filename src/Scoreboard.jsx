import React from "react";
import { useStoreState } from "easy-peasy";
import Table from "react-bootstrap/Table";
import getRanking from "./ranking";
import Row from "./Row";
import SegmentLink from "./segmentLink";
import HeaderRow from "./HeaderRow";
import { getSortingMode } from "./sorting";

const Scoreboard = props => {
  const { sortingMode, segments, dateRange } = props;

  const state = useStoreState(state => state);

  const storeSegments = state.segments;
  const allTime = state.athleteEfforts[dateRange];
  const leaderboardsAllTime = state.segmentLeaderboards[dateRange];

  const segmentRowMapper = clicked =>
    segments.map(segId => {
      const numAthletes = leaderboardsAllTime[segId]
        ? leaderboardsAllTime[segId].length
        : "";
      const backupName = storeSegments[segId] && storeSegments[segId].name;
      const segmentName = backupName;
      return (
        <SegmentLink
          key={segId}
          segmentId={segId}
          numAthletes={numAthletes}
          segmentName={segmentName}
          distance={storeSegments[segId] && storeSegments[segId].distance}
          averageGrade={
            storeSegments[segId] && storeSegments[segId].average_grade
          }
          clicked={clicked}
        />
      );
    });

  const ranking = getRanking(allTime, segments, leaderboardsAllTime).sort(
    getSortingMode(sortingMode)(allTime)
  );

  const dataRows = ranking.map(({ athleteName, score, rankPos }, ind) => (
    <Row
      key={athleteName}
      args={[athleteName, score, allTime[athleteName], segments, rankPos]}
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
