import React from "react";
import Page from "./Page";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import useLocalStorage from "@rehooks/local-storage";
import store from "./Store";

import ReactGA from 'react-ga';

const isDevelopment = process.env.NODE_ENV === "development"

if (isDevelopment) {
  ReactGA.initialize('UA-163677104-1', {
    debug: false,
    titleCase: false,
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const zoomOutMobile = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.content = "initial-scale=1";
    viewport.content = "width=device-width";
  }
};

const App = () => {
  const [segmentGroup] = useLocalStorage("segmentGroup");
  const [lsClub] = useLocalStorage("club");
  const [period] = useLocalStorage("period");

  zoomOutMobile();
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          {/* <Route path={"/:segmentGroup"} component={Page} /> */}
          <Route
            path={"/"}
            component={props => (
              <Page {...props} segmentGroup={segmentGroup} lsClub={lsClub} period={period} />
            )}
          />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
