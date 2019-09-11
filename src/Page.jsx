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
  return (
    <div>   
      <Button  onClick={setNext}>{urlFuncKey} </Button>
      
      <Scoreboard />
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.tryvann} />
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.voksenskog}/>
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.grefsenkollen}/>
    </div>
  );
}

export default Page;
