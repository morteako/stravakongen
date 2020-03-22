import React, { useState, useEffect } from "react";
import * as Api from "./api";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as qs from "query-string";
import { clubs } from "./data/ids";

const urlFunctions = {
  all: Api.createSegmentLeaderboardClubFull,
  year: Api.createSegmentLeaderboardClubThisYear
};

const SegmentBoard = props => {
  const [segmentPayload, setSegmentPayload] = useState(null);
  const [payload, setPayload] = useState(null);
  const segmentId = props.segmentId;

  const club = props.club || clubs.bekk;

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

export default SegmentBoard;
