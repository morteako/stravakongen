import { useState, useEffect } from "react";
import * as Api from "./calculation/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const urlFunctions = {
  all: Api.createSegmentLeaderboardClubFull,
  year: Api.createSegmentLeaderboardClubThisYear,
  month: Api.createSegmentLeaderboardClubThisMonth,
};

const Segmentboard = (props) => {
  const [segmentPayload, setSegmentPayload] = useState(null);
  const [payload, setPayload] = useState(null);
  const { club, segmentId } = props;

  const accessToken = useStoreState((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;
    const leaderboardRequestCreator = urlFunctions[props.dateRange];
    const req = leaderboardRequestCreator(club.id || club, segmentId);
    console.log(req)
    Api.getRequest(accessToken, req).then((x) => {
      console.log(x)
      setPayload({
        id: segmentId,
        dateRange: props.dateRange,
        leaderboard: x.data.entries,
      });
    });
  }, [segmentId, props.dateRange, club, accessToken]);

  useStoreActions((actions) => actions.addLeaderboard)(payload);

  useEffect(() => {
    if (!accessToken) return;
    const segReq = Api.createSegment(segmentId);

    Api.getRequest(accessToken, segReq).then((x) => {
      setSegmentPayload(x.data);
    });
  }, [segmentId, accessToken]);

  useStoreActions((actions) => actions.addSegment)(segmentPayload);

  return null;
};

export default Segmentboard;
