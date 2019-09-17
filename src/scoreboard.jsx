import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import {createScoreEntry} from "./ScoreEntry";
import { allSegments } from "./data/segments";
import getRanking from "./ranking";

const Scoreboard = props => {
    // const allTime = useStoreState( state => state.athleteEfforts.all );
    // const leaderboardsAllTime = useStoreState( state => state.segmentLeaderboards.all );
    const state = useStoreState( state => state);
    const allTime = state.athleteEfforts.all;
    const leaderboardsAllTime = state.segmentLeaderboards.all;
    

    const segmentUrl = "https://www.strava.com/segments/";
    
    const createSegmentLink = seg => (
        <th key={seg.id}> 
            <a href={segmentUrl + seg.id} > 
                {allSegments[seg.id].name} 
            </a> 
        </th>
    );
        

    const segmentRow = props.segments.map(createSegmentLink);
    
    const ranking = getRanking(allTime, props.segments,leaderboardsAllTime);
    
    console.log("ranking",ranking);

    const createRow = ({athleteName,ranks},athleteRecord,ind) => (
        <tr key={athleteName}> 
            <td> 
                {athleteName}
            </td>
            <td>
               {`${ind+1} (${ranks})`}
            </td>
            {Array.from(props.segments).map( (seg,ind) => 
                createScoreEntry(athleteRecord[seg.id],ind))}
        </tr>
    );
    // const dataRows = ranking.map(o => createRow(o, allTime[o.athleteName]) Object.entries(allTime).map(createRow);
    const dataRows = ranking.map((o,ind) => createRow(o, allTime[o.athleteName],ind));
    

    return (
        <>  
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
        </>
    );
} 

export default Scoreboard;