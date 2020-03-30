import React from "react";
import SegmentBoard from "./segmentboard";
import Scoreboard from "./Scoreboard";
import { allGroups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";
import { useAccesToken } from "./calculation/api";
import Dropdowns from "./Dropdowns";

const Page = props => {
  const segmentGroupsFromUrl = props.match.params.segmentGroup;

  const defaultSegmentGroup = "bml";
  const startSegmentGroup = allGroups[segmentGroupsFromUrl]
    ? segmentGroupsFromUrl
    : defaultSegmentGroup;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setSegmentGroup] = React.useState(startSegmentGroup);
  const [sortMode, setSortMode] = React.useState({ score: true });
  const [clicked, setClicked] = React.useState(false);

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

  return (
    <div>
      <Dropdowns
        props={{
          currentSegments,
          sortMode,
          segmentGroup,
          dateRange,
          setDateRange,
          setSortMode,
          setSegmentGroup,
          clicked
        }}
      />
      <Scoreboard
        sortingMode={sortMode}
        segments={currentSegments}
        dateRange={dateRange}
        clicked={clicked}
        setClicked={setClicked}
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
