import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import {createScoreEntry} from "./ScoreEntry";
import { allSegments } from "./data/segments";

const Scoreboard = props => {
    const allTime = useStoreState( state => state.leaderboards.all );
    // const segments = useStoreState( state => state.segments );

    const segmentUrl = "https://www.strava.com/segments/";
    
    const createSegmentLink = seg => (
        <th key={seg.id}> 
            <a href={segmentUrl + seg.id} > 
                {allSegments[seg.id].name} 
            </a> 
        </th>
    );
        

    const segmentRow = props.segments.map(createSegmentLink);
    

    const createRow = ([athlete_name,athleteRecord],ind) => (
        <tr key={athlete_name}> 
            <td> 
                {athlete_name}
            </td>
            {Array.from(props.segments).map( (seg,ind) => createScoreEntry(athleteRecord[seg.id],ind))}
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