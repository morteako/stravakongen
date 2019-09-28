import React, { useState, useEffect } from "react";
import * as Api from "./api";
import { useStoreActions } from "easy-peasy";
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

  useEffect(() => {
    const leaderboardRequestCreator = urlFunctions[props.dateRange];
    const req = leaderboardRequestCreator(club, segmentId);
    Api.getRequest(req).then(x => {
      setPayload({
        id: segmentId,
        dateRange: props.dateRange,
        leaderboard: x.data.entries
      });
    });
  }, [segmentId, props.dateRange, club]);

  useStoreActions(actions => actions.addLeaderboard)(payload);

  useEffect(() => {
    const segReq = Api.createSegment(segmentId);

    Api.getRequest(segReq).then(x => {
      setSegmentPayload(x.data);
    });
  }, [segmentId]);

  useStoreActions(actions => actions.addSegment)(segmentPayload);

  return null;
};

export default SegmentBoard;
