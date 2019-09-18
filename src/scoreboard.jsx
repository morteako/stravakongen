import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import { allSegments } from "./data/segments";
import getRanking from "./ranking";
import styles from "./mystyle.module.css"
import Row from "./row";
import SegmentLink from "./segmentLink";


const Scoreboard = props => {
    const {segments, dateRange} = props;

    const state = useStoreState( state => state);
;
    const allTime = state.athleteEfforts[dateRange];
    const leaderboardsAllTime = state.segmentLeaderboards[dateRange];
    

    
        

    const segmentRow = segments.map(seg => 
        <SegmentLink key={seg.id} segmentId={seg.id} segmentName={allSegments[seg.id].name}/>
    );
    
    const ranking = getRanking(allTime, segments,leaderboardsAllTime);
    

    
    
    const dataRows = ranking.map(({athleteName,ranks},ind) =>  
        <Row key={athleteName} args={[athleteName,ranks,allTime[athleteName],segments,ind]} />
    );
       
    

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className={styles.header}>Navn</th>
                    <th className={styles.header}>#</th>
                    {segmentRow}            
                </tr>
            </thead>
            <tbody>
                {dataRows}
            </tbody>
        </Table>
    );
} 

export default Scoreboard;