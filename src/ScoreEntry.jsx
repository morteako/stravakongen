import React from "react";
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const secToMMSS = timeInSecStr => { 
    const secs = parseInt(timeInSecStr,10);
    const date = new Date(null);
    date.setSeconds( secs );
    return date.toISOString().substr(14, 5);
}
const ScoreEntry = props => {
    const {athlete_name,elapsed_time, start_date_local,rank} = props;
    const date = start_date_local.substr(0,10).split("-").reverse().join(" ");
    const elapsedTimeInSeconds = secToMMSS(elapsed_time);
    const text = `${elapsedTimeInSeconds} (#${rank})`;
    return (
        <td> {text} </td>
    )
};

export default ScoreEntry;