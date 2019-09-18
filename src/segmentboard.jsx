import React, { useState, useEffect} from "react";
import * as Api from "./api";
import { useStoreActions } from "easy-peasy";


const urlFunctions = {
  "all" : Api.createSegmentLeaderboardBekkFull,
  "year": Api.createSegmentLeaderboardBekkThisYear
}


// const leaderboardRequestCreator = urlFunctions[props.dateRange]


// useStoreActions(actions => actions.addLeaderboard)(payload)




const SegmentBoard = props => {

    const [segmentPayload,setSegmentPayload] = useState(null)
    const [payload,setPayload] = useState(null)
    const segment = props.segment;

    useEffect( () => {
      const leaderboardRequestCreator = urlFunctions[props.dateRange]
      const req = leaderboardRequestCreator(segment.id);
      Api.getRequest(req).then( 
        x => { 
            setPayload ({
              id          : segment.id,
              dateRange   : props.dateRange,
              leaderboard : x.data.entries
            });
          })
      }, [segment.id,props.dateRange])
      
      useStoreActions(actions => actions.addLeaderboard)(payload);
    
      useEffect( () => {
        const segReq = Api.createSegment(segment.id);
      
        Api.getRequest(segReq).then( 
          x => { 
            setSegmentPayload(x.data);
          }
        );
      },[segment.id]);
      useStoreActions(actions => actions.addSegment)(segmentPayload);

      return null;
      
} 

export default SegmentBoard;