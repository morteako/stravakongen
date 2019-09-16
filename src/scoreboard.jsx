import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import {createScoreEntry} from "./ScoreEntry";
import { cyclingSegments } from "./data/segments";

const Scoreboard = props => {
    const allTime = useStoreState( state => state.leaderboards.all );
    const segments = useStoreState( state => state.segments );

    const segmentUrl = "https://www.strava.com/segments/";
    const createSegmentLink = seg => (
        <th> 
            <a href={segmentUrl + seg}> 
                {cyclingSegments[seg].name} 
            </a> 
        </th>
    );
    const _segmentRow = segments.map(seg => <th>{seg}</th>);
    const segmentRow = segments.map(createSegmentLink);
    

    const createRow = ([athlete_name,athleteRecord]) => (
        <tr> 
            <td> 
                {athlete_name}
            </td>
            {segments.map( seg => createScoreEntry(athleteRecord[seg]))}
        </tr>
    );
    const dataRows = Object.entries(allTime).map(createRow);
    
    

    return (
        <>  
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Navn</th>
                        {segmentRow}                    
                
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </Table>
            {JSON.stringify(allTime)}
        </>
    );
} 

export default Scoreboard;