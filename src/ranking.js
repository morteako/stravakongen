import * as L from 'partial.lenses';


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


    const summed = 
        L.modify(
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
    return onlyWithEfforts;
}

export default getRanking;