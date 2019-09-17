import React from 'react';
import SegmentBoard from './segmentboard';
import Scoreboard from './scoreboard';
import Button from 'react-bootstrap/Button';


const nextDateRange = {
    "all" : "year",
    "year" : "all"
};

const nextActivityType = {
  "running" : "cycling",
  "cycling" : "running"
};



const Page = props => {
    
    const [dateRange,setDateRange] = React.useState("all");
    const [activityType,setActivityType] = React.useState("cycling");

    const switchDateRange = () => setDateRange(nextDateRange[dateRange])
    const switchActivity  = () => setActivityType(nextActivityType[activityType])
    
    const createSegmentBoard = (seg,ind) => 
      <SegmentBoard key={ind} dateRange={dateRange} segment={seg} activityType={activityType}/>
    
    const currentSegments = Object.values(props.segments).filter(seg => seg.activityType === activityType);
    
  return (
    <div>   
      <Button onClick={switchDateRange}>{dateRange} </Button>
      <Button onClick={switchActivity}>{activityType} </Button>
      
      <Scoreboard segments={currentSegments} dateRange={dateRange}/>
      
      {currentSegments.map(createSegmentBoard)}
    </div>
  );
}

export default Page;
