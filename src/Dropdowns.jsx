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

const dateRangeTitle = {
    all: "Gjennom alle tider",
    year: "I år"
  };

const Dropdowns = ({props}) => {
    const {segmentGroup,dateRange,sortMode,currentSegments,setDateRange, setSortMode, setSegmentGroup} = props;
    console.log(props,props.currentSegments)
    console.log(currentSegments)

    const dateRangeDropwdownItems = Object.entries(dateRangeTitle)
    .map(([k, v]) => (
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
      <Dropdown.Item
        key={group}
        className={styles.dropdown_item}
        onClick={() => setSegmentGroup(group)}
      >
        {group + " " + groupEmojis[group]}
      </Dropdown.Item>
    ));


  const sortModes = [
    {score:true},
    {name:true},
    {newest:true} 
  ].concat(currentSegments.map(x => ({segmentId : x}))); 

  
  const storeSegments = useStoreState( state => state.segments); 

  const sortDropdownItems = 
    sortModes.map(sortMode => (
        <Dropdown.Item
          key={getSortingName(sortMode,storeSegments)}
          className={styles.dropdown_item}
          onClick={() => setSortMode(sortMode)}
        >
          {getSortingName(sortMode,storeSegments)}
        </Dropdown.Item>
      )
    );
  
  const [mainGroup1, mainGroup2, ...restOfGroups] = Object.keys(groupEmojis);

    return (
        <div className={styles.button_row}>
        <DropdownButton
          className={styles.button}
          title={
            "Segmentgruppe : " + segmentGroup + " " + groupEmojis[segmentGroup]
          }
        >
          {mapGroupsToItems([mainGroup1, mainGroup2])}
          <DropdownDivider className={styles.divider} />
          {mapGroupsToItems(restOfGroups)}
        </DropdownButton>
        <DropdownButton
          className={styles.button}
          title={"Periode : " + dateRangeTitle[dateRange]}
        >
          {dateRangeDropwdownItems}
        </DropdownButton>
        <DropdownButton
          className={styles.button}
          title={"Sortering : " + getSortingName(sortMode,storeSegments)}
        >
          {sortDropdownItems}
        </DropdownButton>
       
      </div>
    );
}

export default Dropdowns;