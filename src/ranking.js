import * as L from 'partial.lenses';

// const toObject = array => {
//     array.reduce(
// }

const getRanking = (allTime,segments,leaderboards) => {
    // const g = ([segId,efforts]) => {
    //     const numEfforts = leaderboards.segId.length;
    //     return null;
    // };
    // const f = ([k,v]) => ({name:k, ranks: Object.entries(v).map(g) });
    // const athleteRankings = Object.entries(athleteEfforts).map( f );

    // const athleteRankings = segments.map( athleteRecord[seg.id] );
    console.log("ranky",segments,allTime);
    console.log("segs",segments);
    console.log("leaderboards",leaderboards);

    const getRank = (effort,segmentId) => {
        console.log(effort,segmentId,leaderboards);
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

    const addKeyVal = (obj,entry) => {
        console.log(entry);
        obj[entry.athleteName] = entry.ranks.reduce((a, b) => a + b, 0);
        return obj;
    }
    const rankObj = ranks.reduce(addKeyVal,{});

    // const summed = Array.of(
    //     L.modify(L.compose(L.values,"ranks"), ranks => ranks.reduce((a, b) => a + b, 0), ranks)
    // );
    // console.log()
    const summed = 
        L.modify(L.compose(L.values,"ranks"), ranks => ranks.reduce((a, b) => a + b, 0), ranks);
    
    console.log("hei",ranks,Array.from(ranks),summed,
        Object.entries(ranks).map(([key, value]) => value));

    const summedArray = Object.entries(summed).map(([key, value]) => value);
    console.log(summedArray);
    // summed.sort( (a,b) => a.ranks - b.ranks);
    const sorted = [...summedArray].sort((a,b) => a.ranks - b.ranks)
    console.log(sorted);
        

    return sorted;
}

export default getRanking;