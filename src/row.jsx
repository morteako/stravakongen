
import React from "react";
import styles from "./mystyle.module.css";
import {createScoreEntry} from "./ScoreEntry";
import { useStoreState } from "easy-peasy";

const Row = props => {
    const [clicked, setClicked] = React.useState(false);

    const [athleteName,score,athleteRecord,segments,rankPos] = props.args;
    
    const state = useStoreState( state => state);
    
    return (
        <tr onClick={() => setClicked(!clicked)}> 
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
                    {` (${score})`}
                </span>
            </td>
            {Array.from(segments).map( (segId,ind) => 
                createScoreEntry(athleteRecord[segId],state.segments[segId], clicked,ind))}
        </tr>
    );
};

export default Row;