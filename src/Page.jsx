import React from 'react';
import SegmentBoard from './segmentboard';
import Scoreboard from './scoreboard';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown, { DropdownDivider } from 'react-bootstrap/Dropdown';
import styles from "./mystyle.module.css";
import { groupEmojis, groups } from './data/segments';
import { allSegments } from './data/segments';
import {includes} from "lodash";

const dateRangeTitle = {
  "all" : "Gjennom alle tider",
  "year": "I år"
}

const activityFilters = {
  "cycling" : x => x.activityType === "cycling",
  "running" : x => x.activityType === "running",
  "both"    : _ => true
}


const Page = () => {

    const [dateRange,setDateRange] = React.useState("all");
    const firstGroupAsDefault = groups[0];
    const [segmentGroup,setsegmentGroup] = React.useState(firstGroupAsDefault);

    const createSegmentBoard = (seg,ind) => 
      <SegmentBoard key={ind} dateRange={dateRange} segment={seg}/>
    

    const currentSegments = Object.values(allSegments).filter(seg => seg.groups[segmentGroup]);
    

    const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map( ([k,v]) => (
      <Dropdown.Item key={k} className={styles.dropdown_item} onClick={_ => setDateRange(k)}>
        {v}
      </Dropdown.Item>
    ));

    const mapGroupsToItems = groups => groups.map( group => (
      <Dropdown.Item key={group} className={styles.dropdown_item} onClick={_ => setsegmentGroup(group)}>
        {group + " " + groupEmojis[group]}
      </Dropdown.Item>
    ));
  
    // const segmentGroupsDropdownItems = Object.entries(groupEmojis).map( ([group,emoji]) => (
    //   <Dropdown.Item key={group} className={styles.dropdown_item} onClick={_ => setsegmentGroup(group)}>
    //     {group + " " + emoji}
    //   </Dropdown.Item>
    // ));

  const [group1,group2,...restOfGroups] = Object.keys(groupEmojis);
  console.log(restOfGroups);

  return (
    <div>   
      <div className={styles.button_row}>
      <DropdownButton 
          className={styles.button} 
          title={"Segmentgruppe : " + segmentGroup + " " + groupEmojis[segmentGroup]}
        >
          {mapGroupsToItems([group1,group2])}
          {/* <DropdownDivider /> */}
          {mapGroupsToItems(restOfGroups)}


        </DropdownButton>
        <DropdownButton 
          className={styles.button} 
          title={"Periode : " + dateRangeTitle[dateRange]}
        >
          {dateRangeDropwdownItems}

        </DropdownButton>
        
      </div>
      
      <Scoreboard segments={currentSegments} dateRange={dateRange}/>
      
      {currentSegments.map(createSegmentBoard)}
    </div>
  );
}

export default Page;
