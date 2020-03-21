export const sortingModes = {
    name : x => x.athleteName,
    score:  x => x.score,
    segment : segId => x => x.segmentId
}

export const getSortingMode = arg => {
    console.log(arg);
    if(arg.name) return () => (a,b) => a.athleteName.localeCompare(b.athleteName);
    if(arg.score) return () => (a,b) => a.rankPos - b.rankPos;
    if(arg.segmentId) return all => (a,b) => {
        const aEffort = all[a.athleteName][arg.segmentId]
        const aTime = aEffort ? aEffort.elapsed_time : Infinity;
        const bEffort = all[b.athleteName][arg.segmentId]
        const bTime = bEffort ? bEffort.elapsed_time : Infinity;
        return aTime - bTime;
    }
    // if(arg.newest) return all => (a,b) => {
    //     console.log(all);

    //     return a.athleteName.localeCompare(b.athleteName);
    // }
}