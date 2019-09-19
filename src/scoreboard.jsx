import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import getRanking from "./ranking";
import Row from "./row";
import SegmentLink from "./segmentLink";
import styles from "./mystyle.module.css"
import findNewestPr from "./findNewestPr";
import HeaderRow from "./HeaderRow";


const Scoreboard = props => {
    const {segments, dateRange} = props;

    const state = useStoreState( state => state);

    const storeSegments = state.segments;
    const allTime = state.athleteEfforts[dateRange];
    const leaderboardsAllTime = state.segmentLeaderboards[dateRange];
    
    const newestPrDate = findNewestPr(leaderboardsAllTime);

    const segmentRowMapper = clicked => segments.map(seg => {
        const numAthletes = leaderboardsAllTime[seg.id] ? leaderboardsAllTime[seg.id].length : "";
        return (<SegmentLink 
            key={seg.id}
            segmentId={seg.id}
            numAthletes={numAthletes}
            segmentName={seg.name}
            distance={storeSegments[seg.id] && storeSegments[seg.id].distance}
            averageGrade={storeSegments[seg.id] && storeSegments[seg.id].average_grade}
            clicked={clicked}
        />);
        }
    );
    
    const ranking = getRanking(allTime, segments,leaderboardsAllTime);
    
    const dataRows = ranking.map(({athleteName,ranks,rankPos},ind) =>  
        <Row key={athleteName} args={[athleteName,ranks,allTime[athleteName],segments,rankPos]} />
    );

    return (
        <Table striped bordered hover>
            <thead>
               <HeaderRow segmentRowMapper={segmentRowMapper}/>
            </thead>
            <tbody>
                {dataRows}
            </tbody>
        </Table>
    );
} 

export default Scoreboard;