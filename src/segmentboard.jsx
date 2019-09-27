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
  const segment = props.segment;

  const club = props.club || clubs.bekk;

  useEffect(() => {
    const leaderboardRequestCreator = urlFunctions[props.dateRange];
    const req = leaderboardRequestCreator(club, segment.id);
    console.log(req);
    console.log(req.split(" "));
    Api.getRequest(req).then(x => {
      setPayload({
        id: segment.id,
        dateRange: props.dateRange,
        leaderboard: x.data.entries
      });
    });
  }, [segment.id, props.dateRange, club]);

  useStoreActions(actions => actions.addLeaderboard)(payload);

  useEffect(() => {
    const segReq = Api.createSegment(segment.id);

    Api.getRequest(segReq).then(x => {
      setSegmentPayload(x.data);
    });
  }, [segment.id]);

  useStoreActions(actions => actions.addSegment)(segmentPayload);

  return null;
};

export default SegmentBoard;
