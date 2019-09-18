
import React from "react";
import styles from "./mystyle.module.css";
import {createScoreEntry} from "./ScoreEntry";

const Row = props => {
    const [athleteName,ranks,athleteRecord,segments,rankPos] = props.args;
    return (
        <tr> 
            <td> 
                <b>{athleteName}</b>
                {" "}
                {rankPos === 0 && "🥇" }
                {rankPos === 1 && "🥈" }
                {rankPos === 2 && "🥉" }
            </td>
            <td className={styles.ranktext_header}>
                <span className={styles.ranktext_rank} >
                    {rankPos+1}
                </span>
                <span className={styles.ranktext_score}>
                    {` (${ranks})`}
                </span>
            </td>
            {Array.from(segments).map( (seg,ind) => 
                createScoreEntry(athleteRecord[seg.id],ind))}
        </tr>
    );
};

export default Row;