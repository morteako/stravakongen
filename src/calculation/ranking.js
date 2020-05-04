import { groupBy } from "lodash";

const fixSharedPosition = rankings => {
  const indexed = rankings.map((obj, ind) => ({ ...obj, rankPos: ind }));

  const grouped = Object.values(groupBy(indexed, x => x.score));

  const setNewRankPos = rankPos => obj => ({ ...obj, rankPos });
  const fixedRankPos = grouped.flatMap(group =>
    group.map(setNewRankPos(group[0].rankPos))
  );

  return fixedRankPos;
};

// export const rankLowestPoints = (allTime, segments, leaderboards) => 
//   rankingGen(
//     allTime,
//     segments,
//     leaderboards,
//     (segId => leaderboards[segId].length + 1),
//     (rank => rank),
//     ((a,b) => a.score - b.score)
//   )

export const rankHighestPoints = (allTime, segments, leaderboards) => 
  rankingGen(
    allTime,
    segments,
    leaderboards,
    (_ => 0),
    calcScore,
    ((a,b) => b.score - a.score)
  )


export const pointsForFirstPlace = 50

export const calcScore = rank => pointsForFirstPlace + 1 - rank

const rankingGen = (allTime, segments, leaderboards, getNoEffortScore, calcScore, sorter) => {
  

  const getRank = (effort, segmentId) => {
    if (!effort) return { score: getNoEffortScore(segmentId) };
    return { score: calcScore(effort.rank), effort: true, start_date: effort.start_date };
  };

  const curSegments = segments.filter(segId => leaderboards[segId]);

  const createRanks = ([athlete_name, athleteRecord]) => ({
    athleteName: athlete_name,
    ranks: curSegments.map(segId => getRank(athleteRecord[segId], segId))
  });
  const leaderboardWithRanks = Object.entries(allTime)
    .map(createRanks)
    .filter(obj => obj.ranks.some(x => x.effort));

  const summed = leaderboardWithRanks.map(({ athleteName, ranks }) => ({
    athleteName,
    ranks,
    score: ranks.reduce((a, b) => a + b.score, 0)
  }));

  const summedArray = Object.entries(summed).map(([, value]) => value);
  summedArray.sort(sorter);
  return fixSharedPosition(summedArray);
};


