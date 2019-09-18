import React from "react";
import styles from "./mystyle.module.css";

const segmentUrl = "https://www.strava.com/segments/";
    
const SegmentLink = props => {
    const {segmentId,segmentName} = props; 

    return (
        <th key={segmentId}> 
            <a  className={styles.header}
                href={segmentUrl + segmentId}
            > 
                {segmentName}
            </a> 
        </th>
    );
};

export default SegmentLink;