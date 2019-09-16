import React from 'react';
import SegmentBoard from './segmentboard';
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
    // const _activityType = useStoreState( state => state.activityType );
    const [urlFuncKey,setUrlFuncKey] = React.useState("all");
    const [activityType,setActivityType] = React.useState("cycling");

    const switchDateRange = () => setUrlFuncKey(nextUrlFunctions[urlFuncKey])
    const switchActivity  = () => setActivityType(nextActivityType[activityType])
    
    const createSegmentBoard = (seg,ind) => 
      <SegmentBoard key={ind} dateRange={urlFuncKey} segment={seg} activityType={activityType}/>
    
    const currentSegments = Object.values(props.segments).filter(seg => seg.activityType === activityType);
    // console.log("curr",currentSegments,activityType);
  return (
    <div>   
      <Button  onClick={switchDateRange}>{urlFuncKey} </Button>
      <Button  onClick={switchActivity}>{activityType} </Button>
      
      <Scoreboard segments={currentSegments}/>
      
      {currentSegments.map(createSegmentBoard)}
    </div>
  );
}

export default Page;
