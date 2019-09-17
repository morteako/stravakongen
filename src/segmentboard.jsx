import React, { useState, useEffect} from "react";
import * as Api from "./api";
import { useStoreActions } from "easy-peasy";


const urlFunctions = {
  "all" : Api.createSegmentLeaderboardBekkFull,
  "year": Api.createSegmentLeaderboardBekkThisYear
}


const SegmentBoard = props => {

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
      
      useStoreActions(actions => actions.addLeaderboard)(payload)
    

    
    
    return (
        <>

        </>
    )
} 

export default SegmentBoard;