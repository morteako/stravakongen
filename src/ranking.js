import * as L from "partial.lenses";
import { groupBy } from "lodash";

const fixSharedPosition = rankings => {
  const indexed = rankings.map((obj, ind) => ({ ...obj, rankPos: ind }));

  const grouped = Object.values(groupBy(indexed, x => x.ranks));

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
  const ranks = Object.entries(allTime)
    .map(createRanks)
    .filter(obj => obj.ranks.some(x => x.effort));


  const summed = L.modify(
    L.compose(L.values, "ranks"),
    xs => xs.reduce((a, b) => a + b.score, 0),
    ranks
  );

  const summedArray = Object.entries(summed).map(([, value]) => value);
  const sorted = [...summedArray].sort((a, b) => a.ranks - b.ranks);

  return fixSharedPosition(sorted);
};

export default getRanking;
