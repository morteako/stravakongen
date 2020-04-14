import React from "react";
import styles from "./mystyle.module.css";

export const createScoreEntry = (effortData, segmentData, clicked, ind) => {
  const props = { ...effortData, segmentData, clicked };
  return effortData ? (
    <ScoreEntry key={ind} {...props} />
  ) : (
      <EmptyScoreEntry key={ind} />
    );
};

const secToMMSS = durationInSec => {
  const secs = parseInt(durationInSec, 10);
  const date = new Date(null);
  date.setSeconds(secs);
  return date.getHours() > 1 //means that it lasts more than 1 hour
    ? date.toISOString().substr(11, 8) //"add" hh:
    : date.toISOString().substr(14, 5); //skip hh:
};

const isSetPastWeek = date => {
  const diffTime = Math.abs(new Date() - new Date(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 7;
};

const getSpeedInfo = (elapsedTimeInSecs, segmentData) => {
  if (!(segmentData && segmentData.distance)) return "";
  if (segmentData.activity_type === "Ride") {
    const kmH = segmentData.distance / ((1000 * elapsedTimeInSecs) / (60 * 60));
    return kmH.toFixed(1) + " km/t";
  }
  if (segmentData.activity_type === "Run") {
    const secKm = (1000 * elapsedTimeInSecs) / segmentData.distance;
    return secToMMSS(secKm) + " min/km";
  }
  return "";
};

const formatDate = date =>
  date
    .substr(0, 10)
    .split("-")
    .reverse()
    .join(".");

const ScoreEntry = props => {
  const { elapsed_time, start_date_local, rank, segmentData, clicked } = props;
  const date = formatDate(start_date_local);

  const elapsedTimeInSeconds = secToMMSS(elapsed_time);
  const text = <div><b>{elapsedTimeInSeconds}</b> {`- #${rank}`}</div>;
  const speedInfo = getSpeedInfo(elapsed_time, segmentData);

  const entryClasses = {
    1: styles.entry_first,
    2: styles.entry_second,
    3: styles.entry_third
  };
  const scoreClass = entryClasses[rank] || styles.entry_normal;

  const borderClass = isSetPastWeek(start_date_local)
    ? ` ${styles.entry_border}`
    : "";
  return (
    <td className={scoreClass + borderClass}>
      {text} <span>{clicked && date + " - " + speedInfo}</span>
    </td>
  );
};

const EmptyScoreEntry = _ => {
  return <td> </td>;
};

export default ScoreEntry;
