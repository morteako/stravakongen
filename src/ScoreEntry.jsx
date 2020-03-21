import React from "react";
import styles from "./mystyle.module.css";
import diff from "jest-diff";

export const createScoreEntry = (data,clicked,ind) => {
    const props = {...data,clicked};
    return data 
        ? <ScoreEntry key={ind} {...props} /> 
        : <EmptyScoreEntry key={ind}/>;
}

const EmptyScoreEntry = _ => {
    return <td>  </td>;
}

const secToMMSS = durationInSec => { 
    const secs = parseInt(durationInSec,10);
    const date = new Date(null);
    date.setSeconds( secs );
    return date.getHours() > 1 //means that it lasts more than 1 hour
        ? date.toISOString().substr(11, 8) //"add" hh:
        : date.toISOString().substr(14, 5) //skip hh:
    ;
}

const isSetPastWeek = date => {
    
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays < 7;
}

const ScoreEntry = props => {
    const {elapsed_time, start_date_local,rank,clicked} = props;
    const date = start_date_local.substr(0,10).split("-").reverse().join(".");
    const elapsedTimeInSeconds = secToMMSS(elapsed_time);
    const text = `${elapsedTimeInSeconds} (#${rank})`;

    const entryClasses = {
        1:styles.entry_first,
        2:styles.entry_second,
        3:styles.entry_third
    };
    const scoreClass = entryClasses[rank] || styles.entry_normal;

    const borderClass = isSetPastWeek(start_date_local) ? ` ${styles.entry_border}` : "";
    return (
        <td className={scoreClass + borderClass}> 
            {text} 
            {' '}
            <span>{clicked && date}</span>
        </td>
    )
};

export default ScoreEntry;