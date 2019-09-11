import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import ScoreEntry from "./ScoreEntry";

const Scoreboard = props => {
    const allTime = useStoreState( state => state.leaderboards.all );
    const segments = useStoreState( state => state.segments );
    const segmentRow = segments.map(seg => <th>{seg}</th>);
    
    const createRow = athleteRecord => <tr> {Object.values(athleteRecord).map( x => <ScoreEntry {...x} />)} </tr>;
    const dataRows = Object.values(allTime).map(createRow);

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
                    {/* {[1,2,3].map(createRowT)} */}
                    {/* {dataRows} */}
                    {/* {props.entries.map( 
                        (entry,ind) => <ScoreEntry key={ind} {...entry} />
                    )} */}
                </tbody>
            </Table>
            {JSON.stringify(allTime)}
        </>
    );
} 

export default Scoreboard;