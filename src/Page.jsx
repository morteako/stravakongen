import React from "react";
import SegmentBoard from "./segmentboard";
import SortDropdownItem from "./SortDropdownItem";
import Scoreboard from "./scoreboard";
import { useStoreState } from "easy-peasy";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { groupEmojis, groups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";
import { useAccesToken } from "./api";
import { getSortingName, getSortingMode } from "./sorting";
import Dropdowns from "./Dropdowns";



const Page = props => {
  const segmentGroupsFromUrl = props.match.params.segmentGroup;
  const firstGroupAsDefault = groups[0];
  const startSegmentGroup = groupEmojis[segmentGroupsFromUrl]
    ? segmentGroupsFromUrl
    : firstGroupAsDefault;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setSegmentGroup] = React.useState(startSegmentGroup);
  const [sortMode, setSortMode] = React.useState({score:true});
  const [leaderboardsAllTime, setLeaderboardsAllTime] = React.useState({});

  console.log(sortMode)

  

  console.log(leaderboardsAllTime)
  console.log(segmentGroup)

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
      
      <Dropdowns props={{currentSegments,sortMode,segmentGroup,dateRange, setDateRange, setSortMode, setSegmentGroup}} />
      <Scoreboard sortingMode={sortMode} segments={currentSegments} dateRange={dateRange} setSegmentLeaderboards={setLeaderboardsAllTime} />
      {currentSegments.map((segId, ind) => (
      <SegmentBoard
        key={ind}
        club={queryParams.club}
        dateRange={dateRange}
        segmentId={segId}
      />))}
    </div>
    
  );
};

export default Page;
