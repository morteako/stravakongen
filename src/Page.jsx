import React from "react";
import SegmentBoard from "./segmentboard";
import Scoreboard from "./Scoreboard";
import { groupEmojis, groups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";
import { useAccesToken } from "./api";
import Dropdowns from "./Dropdowns";
import { clubs, getClubName } from "./data/ids";
import "./Page.css";

const Page = props => {
  const segmentGroupsFromUrl = props.match.params.segmentGroup;
  const firstGroupAsDefault = groups[0];
  const startSegmentGroup = groupEmojis[segmentGroupsFromUrl]
    ? segmentGroupsFromUrl
    : firstGroupAsDefault;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setSegmentGroup] = React.useState(startSegmentGroup);
  const [sortMode, setSortMode] = React.useState({ score: true });

  const queryParams = qs.parse(props.location.search);

  useAccesToken();

  let urlSegments = [];
  try {
    const res = JSON.parse(queryParams.segments);
    urlSegments = !res.some(isNaN) ? res : [];
  } catch (error) {
    // console.log(error);
  }

  const segmentsFromGroup = Object.values(allSegments)
    .filter(seg => seg.groups[segmentGroup])
    .map(x => x.id);

  const currentSegments =
    urlSegments.length > 0 ? urlSegments : segmentsFromGroup;

  const club = queryParams.club || clubs.bekk.id;

  return (
    <div>
      <div>
        <h1>Stravakongen</h1>
        <h2>{getClubName(club)}</h2>
      </div>
      <Dropdowns
        props={{
          currentSegments,
          sortMode,
          segmentGroup,
          dateRange,
          setDateRange,
          setSortMode,
          setSegmentGroup
        }}
      />
      <Scoreboard
        sortingMode={sortMode}
        segments={currentSegments}
        dateRange={dateRange}
      />
      {currentSegments.map((segId, ind) => (
        <SegmentBoard
          key={ind}
          club={queryParams.club}
          dateRange={dateRange}
          segmentId={segId}
        />
      ))}
    </div>
  );
};

export default Page;
