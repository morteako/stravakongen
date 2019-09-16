import { KeyObject } from "crypto";

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

    return ranks;
}

export default getRanking;