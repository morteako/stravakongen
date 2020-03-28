import React from "react";
import styles from "./mystyle.module.css";
import { createScoreEntry } from "./ScoreEntry";
import { useStoreState } from "easy-peasy";

const Row = props => {
  const [athleteName, score, athleteRecord, segments, rankPos] = props.args;
  const { clicked, flipClicked } = props;

  const state = useStoreState(state => state);
  const medals = {
    0: " 🥇",
    1: " 🥈",
    2: " 🥉"
  };
  return (
    <tr onClick={flipClicked}>
      <td>
        <b>{athleteName}</b>
        {medals[rankPos]}
      </td>
      <td className={styles.ranktext_header}>
        <span className={styles.ranktext_rank}>{rankPos + 1}</span>
        <span className={styles.ranktext_score}>{` (${score})`}</span>
      </td>
      {Array.from(segments).map((segId, ind) =>
        createScoreEntry(
          athleteRecord[segId],
          state.segments[segId],
          clicked,
          ind
        )
      )}
    </tr>
  );
};

export default Row;
