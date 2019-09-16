import React from 'react';
import SegmentBoard from './segmentboard';
import {cyclingSegments} from './data/segments';
import Scoreboard from './scoreboard';
import Button from 'react-bootstrap/Button';



const nextUrlFunctions = {
    "all" : "year",
    "year" : "all"
};



function Page() {
    
    const [urlFuncKey,setUrlFuncKey] = React.useState("all")

    const setNext = () => setUrlFuncKey(nextUrlFunctions[urlFuncKey])
    
    const createSegmentBoard = seg => 
      <SegmentBoard dateRange={urlFuncKey} segment={seg} />
    

  return (
    <div>   
      <Button  onClick={setNext}>{urlFuncKey} </Button>
      
      <Scoreboard />
      
      {Object.values(cyclingSegments).map(createSegmentBoard)}
    </div>
  );
}

export default Page;
