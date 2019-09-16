import React, { useState, useEffect} from "react";
import * as Api from "./api";
import { useStoreActions } from "easy-peasy";


const urlFunctions = {
  "all" : Api.createSegmentLeaderboardBekkFull,
  "year": Api.createSegmentLeaderboardBekkThisYear
}


const SegmentBoard = props => {
    // const [entries,setEntries] = useState([])
    const [payload,setPayload] = useState(null)
    const segment = props.segment;

    useEffect( () => {
      const leaderboardRequestCreator = urlFunctions[props.dateRange]
      const req = leaderboardRequestCreator(segment.id);
      Api.getRequest(req).then( 
        x => { 
            console.log(x);
            // setEntries(x.data.entries);
            setPayload ({
              id          : segment.id,
              dateRange   : props.dateRange,
              leaderboard : x.data.entries
            });
          })
      }, [segment.id,props.dateRange])
      
      useStoreActions(actions => actions.addLeaderboard)(payload)
    

    
    
    console.log("payload",payload);
    return (
        <>

        </>
    )
} 

export default SegmentBoard;