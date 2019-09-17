import React from 'react';
import SegmentBoard from './segmentboard';
import Scoreboard from './scoreboard';
import Button from 'react-bootstrap/Button';


const nextDateRange = {
    "all" : "year",
    "year" : "all"
};

const nextActivityType = {
  "cycling" : "running",
  "running" : "both",
  "both":"cycling"
};

const activityTypeEmojis = {
  "cycling" : "🚴🏼‍♂️",
  "running" : "🏃🏻‍♂️",
  "both":"🚴🏼‍♂️ " + "🏃🏻‍♂️"
};

const activityFilters = {
  "cycling" : x => x.activityType === "cycling",
  "running" : x => x.activityType === "running",
  "both": x => true
}

const Page = props => {
    
    const [dateRange,setDateRange] = React.useState("all");
    const [activityType,setActivityType] = React.useState("cycling");

    const switchDateRange = () => setDateRange(nextDateRange[dateRange])
    const switchActivity  = () => setActivityType(nextActivityType[activityType])
    
    const createSegmentBoard = (seg,ind) => 
      <SegmentBoard key={ind} dateRange={dateRange} segment={seg} activityType={activityType}/>
    
    const segFilter = activityFilters[activityType];
    const currentSegments = Object.values(props.segments).filter(segFilter);
    
    const activityEmoji = activityTypeEmojis[activityType];
  return (
    <div>   
      <Button onClick={switchDateRange}>{dateRange} </Button>
      <Button onClick={switchActivity}>{activityType + " " + activityEmoji} </Button>
      
      <Scoreboard segments={currentSegments} dateRange={dateRange}/>
      
      {currentSegments.map(createSegmentBoard)}
    </div>
  );
}

export default Page;
