import React from "react";
import SegmentBoard from "./segmentboard";
import Scoreboard from "./scoreboard";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/Dropdown";
import styles from "./mystyle.module.css";
import { groupEmojis, groups } from "./data/segments";
import { allSegments } from "./data/segments";
import * as qs from "query-string";

const dateRangeTitle = {
  all: "Gjennom alle tider",
  year: "I år"
};

const Page = props => {
  const segmentGroupFromUrl = props.match.params.segmentGroup;
  const firstGroupAsDefault = groups[0];
  const startGroup = segmentGroupFromUrl || firstGroupAsDefault;

  const [dateRange, setDateRange] = React.useState("all");
  const [segmentGroup, setsegmentGroup] = React.useState(startGroup);

  const createSegmentBoard = (seg, ind) => (
    <SegmentBoard key={ind} dateRange={dateRange} segment={seg} />
  );

  const currentSegments = Object.values(allSegments).filter(
    seg => seg.groups[segmentGroup]
  );

  const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map(
    ([k, v]) => (
      <Dropdown.Item
        key={k}
        className={styles.dropdown_item}
        onClick={_ => setDateRange(k)}
      >
        {v}
      </Dropdown.Item>
    )
  );

  const mapGroupsToItems = groups =>
    groups.map(group => (
      <Dropdown.Item key={group} className={styles.dropdown_item} href={group}>
        {group + " " + groupEmojis[group]}
      </Dropdown.Item>
    ));

  const [group1, group2, ...restOfGroups] = Object.keys(groupEmojis);
  console.log(props);

  return (
    <div>
      <div className={styles.button_row}>
        <DropdownButton
          className={styles.button}
          title={
            "Segmentgruppe : " + segmentGroup + " " + groupEmojis[segmentGroup]
          }
        >
          {mapGroupsToItems([group1, group2])}
          <DropdownDivider className={styles.divider} />
          {mapGroupsToItems(restOfGroups)}
        </DropdownButton>
        <DropdownButton
          className={styles.button}
          title={"Periode : " + dateRangeTitle[dateRange]}
        >
          {dateRangeDropwdownItems}
        </DropdownButton>
      </div>

      <Scoreboard segments={currentSegments} dateRange={dateRange} />

      {currentSegments.map(createSegmentBoard)}
    </div>
  );
};

export default Page;
