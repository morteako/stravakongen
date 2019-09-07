import React from "react";
import Entry from "./entry";

const Leaderboard = props => {
    console.log("leaderboard",props);
    return (
        <>  
            <p> 
                {props.name}
            </p>
            <ul>
                {props.entries.map( 
                    (entry,ind) => <Entry key={ind} {...entry} />
                )}
            </ul>
        </>
    );
} 

export default Leaderboard;