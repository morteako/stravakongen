import React from "react";
import Entry from "./entry";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';


const Leaderboard = props => {
    console.log("leaderboard",props);
    return (
        <>  
            <p> 
                {props.name}
            </p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Navn</th>
                        <th>Tid</th>
                        <th>Dato</th>
                    </tr>
                </thead>
                <tbody>
                    {props.entries.map( 
                        (entry,ind) => <Entry key={ind} {...entry} />
                    )}
                </tbody>
            </Table>
        </>
    );
} 

export default Leaderboard;