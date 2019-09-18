
import React from "react";
import styles from "./mystyle.module.css";
import {createScoreEntry} from "./ScoreEntry";

const Row = props => {
    const [athleteName,ranks,athleteRecord,segments,ind] = props.args;
    return (
        <tr> 
            <td> 
                {athleteName} 
                {" "}
                {ind === 0 && "🥇" }
                {ind === 1 && "🥈" }
                {ind === 2 && "🥉" }
            </td>
            <td className={styles.ranktext_header}>
                <tull className={styles.ranktext_rank} >
                    {ind+1}
                </tull>
                <tull className={styles.ranktext_score}>
                    {` (${ranks})`}
                </tull>
            </td>
            {Array.from(segments).map( (seg,ind) => 
                createScoreEntry(athleteRecord[seg.id],ind))}
        </tr>
    );
};

export default Row;