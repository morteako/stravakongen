import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import { allSegments } from "./data/segments";
import getRanking from "./ranking";
import styles from "./mystyle.module.css"
import Row from "./row";

const Scoreboard = props => {
    const {segments, dateRange} = props;

    const state = useStoreState( state => state);
;
    const allTime = state.athleteEfforts[dateRange];
    const leaderboardsAllTime = state.segmentLeaderboards[dateRange];
    

    const segmentUrl = "https://www.strava.com/segments/";
    
    const createSegmentLink = seg => (
        <th key={seg.id}> 
            <a className={styles.link} href={segmentUrl + seg.id} > 
                {allSegments[seg.id].name} 
            </a> 
        </th>
    );
        

    const segmentRow = segments.map(createSegmentLink);
    
    const ranking = getRanking(allTime, segments,leaderboardsAllTime);
    

    
    
    const dataRows = ranking.map((o,ind) =>  
        <Row args={[o.athleteName,o.ranks,allTime[o.athleteName],segments,ind]} />
    );
       
    

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Navn</th>
                    <th>#</th>
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