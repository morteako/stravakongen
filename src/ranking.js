import * as L from "partial.lenses";
import { groupBy } from "lodash";

const fixSharedPosition = rankings => {
  rankings.sort((a, b) => a.score - b.score);
  const indexed = rankings.map((obj, ind) => ({ ...obj, rankPos: ind }));

  const grouped = Object.values(groupBy(indexed, x => x.score));

  const setNewRankPos = rankPos => obj => ({ ...obj, rankPos });
  const fixedRankPos = grouped.flatMap(group =>
    group.map(setNewRankPos(group[0].rankPos))
  );

  return fixedRankPos;
};

const getRanking = (allTime, segments, leaderboards) => {
  const getNoEffortScore = segId => leaderboards[segId].length + 1;

  const getRank = (effort, segmentId) => {
    if (!effort) return {score : getNoEffortScore(segmentId) };
    return {score : effort.rank, effort:true};
  };

  const curSegments = Array.from(segments.filter(segId => leaderboards[segId]));

  const createRanks = ([athlete_name, athleteRecord], ind) => ({
    athleteName: athlete_name,
    ranks: curSegments.map(segId => getRank(athleteRecord[segId], segId))
  });
  const leaderboardWithRanks = Object.entries(allTime)
    .map(createRanks)
    .filter(obj => obj.ranks.some(x => x.effort));


  // const summed = L.modify(
  //   L.compose(L.values, "ranks"),
  //   xs => xs.reduce((a, b) => a + b.score, 0),
  //   leaderboardWithRanks
  // );

  const summed = leaderboardWithRanks.map(({athleteName,ranks}) => ({
    athleteName,
    score : ranks.reduce((a, b) => a + b.score, 0)
  }))
  

  const summedArray = Object.entries(summed)
    .map(([, value]) => value);
    
  
  return fixSharedPosition(summedArray);
};

export default getRanking;
