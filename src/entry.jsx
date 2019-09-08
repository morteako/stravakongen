import React from "react";

const secToMMSS = timeInSecStr => { 
    const secs = parseInt(timeInSecStr,10);
    const date = new Date(null);
    date.setSeconds( secs );
    return date.toISOString().substr(14, 5);
}
const Entry = props => {
    const {athlete_name,elapsed_time, start_date_local} = props;
    const date = start_date_local.substr(0,10);
    const text = 
        `${athlete_name} - ${secToMMSS(elapsed_time)} - ${date}`;
    return (
        <li>
            {text}
        </li>
    )
};

export default Entry;