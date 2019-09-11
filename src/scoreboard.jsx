import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import ScoreEntry from "./ScoreEntry";

const Scoreboard = props => {
    const allTime = useStoreState( state => state.leaderboards.all );
    const segments = useStoreState( state => state.segments );
    const segmentRow = segments.map(seg => <th>{seg}</th>);
    
    const createRow = ([athlete_name,athleteRecord]) => (
        <tr> 
            <td> 
                {athlete_name}
            </td>
            {Object.values(athleteRecord).map( x => <ScoreEntry {...x} />)}
        </tr>
    );
    const dataRows = Object.entries(allTime).map(createRow);

    return (
        <>  
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
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