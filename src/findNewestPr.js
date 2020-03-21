const findNewestPr = segmentLeaderBoards => {
  const allDates = Object.values(segmentLeaderBoards).flatMap(
    x => x.start_date_local
  );

  console.log(
    "dates",
    segmentLeaderBoards,
    allDates,
    Object.values(segmentLeaderBoards)
  );
};

export default findNewestPr;
