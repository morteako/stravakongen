import React from "react";
import styles from "./mystyle.module.css";

const segmentUrl = "https://www.strava.com/segments/";
    
const SegmentLink = props => {
    const {segmentId,segmentName, numAthletes, distance, averageGrade} = props;
    
    const distanceOneDec = Math.round( (distance / 1000) * 10) / 10;
    const prettyDistance = distanceOneDec + "km";
    const prettyAverageGrade = averageGrade;
    return (
        <th key={segmentId}> 
            <a  className={styles.header}
                href={segmentUrl + segmentId}
            > 
                {segmentName} - {prettyDistance} {prettyAverageGrade}% ({numAthletes})
            </a> 
        </th>
    );
};

export default SegmentLink;