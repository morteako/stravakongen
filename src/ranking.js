import * as L from 'partial.lenses';


const getRanking = (allTime,segments,leaderboards) => {

    const getRank = (effort,segmentId) => {
        if(!effort) return leaderboards[segmentId].length + 1;
        return effort.rank;
    }

    const createRanks = ([athlete_name,athleteRecord],ind) => ({
            athleteName : athlete_name,
            ranks : Array.from(segments)
                .filter(seg => leaderboards[seg.id] )
                .map( seg => getRank(athleteRecord[seg.id],seg.id))
    });
    const ranks = Object.entries(allTime).map(createRanks);


    const summed = 
        L.modify(L.compose(L.values,"ranks"), ranks => ranks.reduce((a, b) => a + b, 0), ranks);
    

    const summedArray = Object.entries(summed).map(([key, value]) => value);
    const sorted = [...summedArray].sort((a,b) => a.ranks - b.ranks)


    return sorted;
}

export default getRanking;