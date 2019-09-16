import React from 'react';
import SegmentBoard from './segmentboard';
// import {cyclingSegments} from './data/segments';
import Scoreboard from './scoreboard';
import Button from 'react-bootstrap/Button';



const nextUrlFunctions = {
    "all" : "year",
    "year" : "all"
};

const nextActivityType = {
  "running" : "cycling",
  "cycling" : "running"
};



const Page = props => {
    
    const [urlFuncKey,setUrlFuncKey] = React.useState("all")
    const [activityType,setActivityType] = React.useState("running")

    const setNext = () => setUrlFuncKey(nextUrlFunctions[urlFuncKey])
    const switchActivity = () => setActivityType(nextActivityType[activityType])
    
    const createSegmentBoard = seg => 
      <SegmentBoard dateRange={urlFuncKey} segment={seg} />
    

  return (
    <div>   
      <Button  onClick={setNext}>{urlFuncKey} </Button>
      <Button  onClick={switchActivity}>{activityType} </Button>
      
      <Scoreboard />
      
      {Object.values(props.segments).map(createSegmentBoard)}
    </div>
  );
}

export default Page;
