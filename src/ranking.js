import * as L from 'partial.lenses';
import {groupBy} from "lodash";

const fixSharedPosition = rankings => {
    const indexed = rankings.map( (obj,ind) => ({...obj,rankPos:ind} ));

    const grouped = Object.values(groupBy(indexed, x => x.ranks));

    const setNewRankPos = rankPos => obj => ({...obj, rankPos})
    const fixedRankPos = grouped.flatMap(group => group.map(setNewRankPos(group[0].rankPos)));

    return fixedRankPos;
}

const getRanking = (allTime,segments,leaderboards) => {

    const getNoEffortScore = segId => leaderboards[segId].length + 1;

    const getRank = (effort,segmentId) => {
        if(!effort) return getNoEffortScore(segmentId);
        return effort.rank;
    }
    const curSegments = Array.from(segments.filter(seg => leaderboards[seg.id]));

    const createRanks = ([athlete_name,athleteRecord],ind) => ({
            athleteName : athlete_name,
            ranks : curSegments.map( seg => getRank(athleteRecord[seg.id],seg.id))
    });
    const ranks = Object.entries(allTime).map(createRanks);


    const summed = L.modify(
        L.compose(L.values,"ranks"), 
        xs => xs.reduce((a, b) => a + b, 0),
        ranks
    );


    

    const summedArray = Object.entries(summed).map(([key, value]) => value);
    const sorted = [...summedArray].sort((a,b) => a.ranks - b.ranks)

    const noEffortsScore = 
        curSegments
                .map(seg => getNoEffortScore(seg.id))
                .reduce((a, b) => a + b, 0);

    const onlyWithEfforts = sorted.filter(x => x.ranks !== noEffortsScore);

    return fixSharedPosition(onlyWithEfforts);
}

export default getRanking;