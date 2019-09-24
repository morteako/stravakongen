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

const secToMMSS = timeInSecStr => { 
    const secs = parseInt(timeInSecStr,10);
    const date = new Date(null);
    date.setSeconds( secs );
    return date.toISOString().substr(14, 5);
}

const isSetPastWeek = date => {
    
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(date,new Date(date),diffTime,diffDays);
    return diffDays < 7;
}

const ScoreEntry = props => {
    const {athlete_name, elapsed_time, start_date_local,rank,clicked} = props;
    const date = start_date_local.substr(0,10).split("-").reverse().join(".");
    const elapsedTimeInSeconds = secToMMSS(elapsed_time);
    const text = `${elapsedTimeInSeconds} (#${rank})`;

    const entryClasses = {
        1:styles.entry_first,
        2:styles.entry_second,
        3:styles.entry_third
    };
    const scoreClass = entryClasses[rank] || styles.entry_normal;
    // console.log(scoreClass);
    const wasSetPastWeek = isSetPastWeek(start_date_local);
    // if(wasSetPastWeek) console.log(date);

    const borderClass = wasSetPastWeek ? ` ${styles.entry_border}` : "";
    return (
        <td className={scoreClass + borderClass}> 
            {text} 
            {' '}
            <span>{clicked && date}</span>
        </td>
    )
};

export default ScoreEntry;