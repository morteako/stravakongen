import React from "react";
import styles from "./mystyle.module.css";

const segmentUrl = "https://www.strava.com/segments/";

const SegmentLink = props => {
  const {
    segmentId,
    realSegmentName,
    providedSegmentName,
    numAthletes,
    distance,
    averageGrade,
    clicked
  } = props;

  const distanceOneDec = Math.round((distance / 1000) * 10) / 10;
  const prettyDistance = distanceOneDec + "km";
  const prettyAverageGrade = averageGrade;
  const extraInfo = ` - ${prettyDistance} ${prettyAverageGrade}% (${numAthletes})`;
  const name = clicked
    ? realSegmentName
    : providedSegmentName || realSegmentName;
  return (
    <a
      className={styles.header}
      href={segmentUrl + segmentId}
      onClick={event => event.stopPropagation()}
    >
      {name} {clicked && extraInfo}
    </a>
  );
};

export default SegmentLink;
