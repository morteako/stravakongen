import React from 'react';
import SegmentBoard from './segmentboard';
import Scoreboard from './scoreboard';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./mystyle.module.css";

const activityTypeTitle = {
  "cycling" : "Sykling 🚴🏼‍♂️",
  "running": "Løping 🏃🏻‍♂️ ",
  "both":"Sykling 🚴🏼‍♂️ og Løping 🏃🏻‍♂️"
}

const dateRangeTitle = {
  "all" : "Gjennom alle tider",
  "year": "I år"
}

const activityFilters = {
  "cycling" : x => x.activityType === "cycling",
  "running" : x => x.activityType === "running",
  "both"    : _ => true
}

const Page = props => {
    
    const [dateRange,setDateRange] = React.useState("all");
    const [activityType,setActivityType] = React.useState("cycling");

    const createSegmentBoard = (seg,ind) => 
      <SegmentBoard key={ind} dateRange={dateRange} segment={seg} activityType={activityType}/>
    
    const segFilter = activityFilters[activityType];
    const currentSegments = Object.values(props.segments).filter(segFilter);
    
    const dateRangeDropwdownItems = Object.entries(dateRangeTitle).map( ([k,v]) => (
      <Dropdown.Item onClick={_ => setDateRange(k)}>
        {v}
      </Dropdown.Item>
    ));
  
    const activityTypeDropdownItems = Object.entries(activityTypeTitle).map( ([k,v]) => (
      <Dropdown.Item className={styles.dropdown_item} onClick={_ => setActivityType(k)}>
        {v}
      </Dropdown.Item>
    ));

  return (
    <div>   
      <div className={styles.button_row}>
        <DropdownButton 
          className={styles.button} 
          size="lg"
          title={"Periode : " + dateRangeTitle[dateRange]}
        >
          {dateRangeDropwdownItems}

        </DropdownButton>
        <DropdownButton 
          className={styles.button} 
          size="lg"
          title={"Aktivitet : " + activityTypeTitle[activityType]}
        >
          {activityTypeDropdownItems}

        </DropdownButton>
        {/* <Button className={styles.button} onClick={switchActivity} size="lg">
          {activityType + " " + activityEmoji} 
        </Button> */}
      </div>
      
      <Scoreboard segments={currentSegments} dateRange={dateRange}/>
      
      {currentSegments.map(createSegmentBoard)}
    </div>
  );
}

export default Page;
