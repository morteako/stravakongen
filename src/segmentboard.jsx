import { useState, useEffect } from "react";
import * as Api from "./calculation/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const urlFunctions = {
  all: Api.createSegmentLeaderboardClubFull,
  year: Api.createSegmentLeaderboardClubThisYear
};

export const useFetches = props => {
  console.log(props);
  const [segmentPayload, setSegmentPayload] = useState(null);
  const [payload, setPayload] = useState(null);
  const { club, currentSegments, dateRange } = props;

  const accessToken = useStoreState(state => state.accessToken);

  useEffect(() => {
    console.log("leaderboard");
    if (!accessToken) return;
    const leaderboardRequestCreator = urlFunctions[dateRange];
    currentSegments.forEach(segmentId => {
      const req = leaderboardRequestCreator(club.id, segmentId);
      Api.getRequest(accessToken, req).then(x => {
        setPayload({
          id: segmentId,
          dateRange: dateRange,
          leaderboard: x.data.entries
        });
      });
    });
  }, [currentSegments, dateRange, club, accessToken]);

  useStoreActions(actions => actions.addLeaderboard)(payload);

  // useEffect(() => {
  //   // console.log("segmentd");
  //   if (!accessToken) return;
  //   currentSegments.forEach(segmentId => {
  //     const segReq = Api.createSegment(segmentId);
  //     Api.getRequest(accessToken, segReq).then(x => {
  //       setSegmentPayload(x.data);
  //     });
  //   });
  // }, [currentSegments, accessToken]);

  useStoreActions(actions => actions.addSegment)(segmentPayload);
};
