import React from "react";
import Page from "./Page";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider, createStore, action } from "easy-peasy";
import useLocalStorage from "@rehooks/local-storage";

const store = createStore({
  accessToken: null,
  athleteEfforts: {
    all: {},
    year: {}
  },
  segmentLeaderboards: {
    all: {},
    year: {}
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

    const segmentId = payload.id;
    state.segmentLeaderboards[payload.dateRange][segmentId] =
      payload.leaderboard;

    const addEntry = entry => {
      entry.segment = segmentId;

      const curEntries =
        state.athleteEfforts[payload.dateRange][entry.athlete_name] || {};
      curEntries[entry.segment] = entry;
      state.athleteEfforts[payload.dateRange][entry.athlete_name] = curEntries;
    };
    payload.leaderboard.forEach(addEntry);
  })
});

const zoomOutMobile = () => {
  const viewport = document.querySelector('meta[name="viewport"]');

  if (viewport) {
    viewport.content = "initial-scale=1";
    viewport.content = "width=device-width";
  }
};

const App = () => {
  const [segmentGroup] = useLocalStorage("segmentGroup");

  zoomOutMobile();
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          {/* <Route path={"/:segmentGroup"} component={Page} /> */}
          <Route
            path={"/"}
            component={props => <Page {...props} segmentGroup={segmentGroup} />}
          />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
