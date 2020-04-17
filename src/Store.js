import { createStore, action } from "easy-peasy";

export const store = createStore({
  accessToken: null,
  athleteEfforts: {
    all: {},
    year: {},
    month: {}
  },
  segmentLeaderboards: {
    all: {},
    year: {},
    month: {}
  },
  segments: {},
  segmentRowClicked: false,
  leaderboardClicked: false,

  setSegmentRowClicked: action((state, clicked) => {
    state.segmentRowClicked = clicked;
  }),
  setLeaderboardClicked: action((state, clicked) => {
    state.leaderboardClicked = clicked;
  }),
  addAccessToken: action((state, acces_token) => {
    if (acces_token) state.accessToken = acces_token;
  }),
  addSegment: action((state, segment) => {
    if (!segment) return;
    const { name, distance, average_grade, activity_type } = segment;
    state.segments[segment.id] = {
      name,
      distance,
      average_grade,
      activity_type
    };
  }),
  addLeaderboard: action((state, payload) => {
    if (!payload) return;

    const filteredLeaderboard = payload.leaderboard.filter(
      effort => effort.rank <= 50
    );

    const segmentId = payload.id;
    state.segmentLeaderboards[payload.dateRange][
      segmentId
    ] = filteredLeaderboard;

    const addEntry = entry => {
      entry.segment = segmentId;

      const curEntries =
        state.athleteEfforts[payload.dateRange][entry.athlete_name] || {};
      curEntries[entry.segment] = entry;
      state.athleteEfforts[payload.dateRange][entry.athlete_name] = curEntries;
    };
    filteredLeaderboard.forEach(addEntry);
  })
});

export default store;
