import React from "react";
import { useStoreState } from "easy-peasy";

const Scoreboard = props => {
    const allTime = useStoreState( state => state.leaderboards.all );
    return (
        <>  
            {JSON.stringify(allTime)}
        </>
    );
} 

export default Scoreboard;