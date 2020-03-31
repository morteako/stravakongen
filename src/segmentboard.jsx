import { useState, useEffect } from "react";
import * as Api from "./calculation/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getClub } from "./data/clubs";
import { writeStorage } from "@rehooks/local-storage";

const urlFunctions = {
  all: Api.createSegmentLeaderboardClubFull,
  year: Api.createSegmentLeaderboardClubThisYear
};

const Segmentboard = props => {
  const [segmentPayload, setSegmentPayload] = useState(null);
  const [payload, setPayload] = useState(null);
  const segmentId = props.segmentId;

  const club = getClub(props.club, props.lsClub);
  writeStorage("club", club);

  const accessToken = useStoreState(state => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;
    const leaderboardRequestCreator = urlFunctions[props.dateRange];
    const req = leaderboardRequestCreator(club, segmentId);
    Api.getRequest(accessToken, req).then(x => {
      setPayload({
        id: segmentId,
        dateRange: props.dateRange,
        leaderboard: x.data.entries
      });
    });
  }, [segmentId, props.dateRange, club, accessToken]);

  useStoreActions(actions => actions.addLeaderboard)(payload);

  useEffect(() => {
    if (!accessToken) return;
    const segReq = Api.createSegment(segmentId);

    Api.getRequest(accessToken, segReq).then(x => {
      setSegmentPayload(x.data);
    });
  }, [segmentId, accessToken]);

  useStoreActions(actions => actions.addSegment)(segmentPayload);

  return null;
};

export default Segmentboard;
