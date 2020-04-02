import React from "react";
import { useFetches } from "./segmentboard";
import Scoreboard from "./Scoreboard";
import { allGroups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";
import { useAccesToken } from "./calculation/api";
import Dropdowns from "./Dropdowns";
import { writeStorage } from "@rehooks/local-storage";
import { useEffect } from "react";
import { getClub } from "./data/clubs";

const Page = props => {
  const lsSegmentGroup = props.segmentGroup;

  const defaultSegmentGroup = "bml";
  const startSegmentGroup = allGroups[lsSegmentGroup]
    ? lsSegmentGroup
    : defaultSegmentGroup;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setSegmentGroup] = React.useState(startSegmentGroup);

  // useEffect(() => writeStorage("segmentGroup", segmentGroup), [segmentGroup]);

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

  const club = getClub(queryParams.club, props.lsClub);
  // writeStorage("club", club);

  useFetches({ club, dateRange, currentSegments });

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
          clicked,
          club
        }}
      />
      <Scoreboard
        sortingMode={sortMode}
        segments={currentSegments}
        dateRange={dateRange}
        clicked={clicked}
        setClicked={setClicked}
      />
    </div>
  );
};

export default Page;
