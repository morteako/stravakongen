import React from 'react';
import SegmentBoard from './segmentboard';
import {cyclingSegments} from './data/segments';
import Scoreboard from './scoreboard';

const nextUrlFunctions = {
    "all" : "year",
    "year" : "all"
};

function Page() {
    const [urlFuncKey,setUrlFuncKey] = React.useState("all")

    const setNext = () => setUrlFuncKey(nextUrlFunctions[urlFuncKey])
  return (
    <div>   
        <button  onClick={setNext}>{urlFuncKey} </button>
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.tryvann} />
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.voksenskog}/>
      <SegmentBoard dateRange={urlFuncKey} segment={cyclingSegments.grefsenkollen}/>
      <Scoreboard />
    </div>
  );
}

export default Page;
