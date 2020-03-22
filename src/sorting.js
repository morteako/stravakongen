import _ from "lodash";

export const getSortingName = (arg,leaderboardsAllTime) => {
    if(arg.name) return "Navn";
    if(arg.score) return "Poeng"
    if(arg.segmentId) {
        const name = leaderboardsAllTime && leaderboardsAllTime[arg.segmentId] && leaderboardsAllTime[arg.segmentId].name;
        return name || arg.segmentId
    }
    if(arg.newest) return "Nyeste oppføring"

}

export const getSortingMode = arg => {
    
    if(arg.name) return () => (a,b) => a.athleteName.localeCompare(b.athleteName);
    if(arg.score) return () => (a,b) => a.rankPos - b.rankPos;
    if(arg.segmentId) return all => (a,b) => {
        const aEffort = all[a.athleteName][arg.segmentId] &&  all[a.athleteName][arg.segmentId].elapsed_time 
        const bEffort = all[b.athleteName][arg.segmentId] &&  all[b.athleteName][arg.segmentId].elapsed_time 
        const aTime = aEffort || Infinity;
        const bTime = bEffort || Infinity;
    
        return aTime - bTime;
    }
    if(arg.newest) return all => (a,b) => {
        const aMin = Object.values(all[a.athleteName]).map(x => new Date(x.start_date))
        const bMin = Object.values(all[b.athleteName]).map(x => new Date(x.start_date))
        return _.max(bMin) - _.max(aMin)
    }
}