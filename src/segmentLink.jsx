import React from "react";
import styles from "./mystyle.module.css";

const segmentUrl = "https://www.strava.com/segments/";
    
const SegmentLink = props => {
    const {segmentId,segmentName, numAthletes, distance, averageGrade, clicked} = props;
    

    const distanceOneDec = Math.round( (distance / 1000) * 10) / 10;
    const prettyDistance = distanceOneDec + "km";
    const prettyAverageGrade = averageGrade;
    const extraInfo = ` - ${prettyDistance} ${prettyAverageGrade}% (${numAthletes})`;
    return (
        <a  className={styles.header}
            href={segmentUrl + segmentId}
        > 
            {segmentName} {clicked && extraInfo}
        </a> 
    );
};

export default SegmentLink;