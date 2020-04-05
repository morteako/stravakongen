import React from "react";
import Page from "./Page";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import useLocalStorage from "@rehooks/local-storage";
import store from "./Store";
import styles from "./mystyle.module.css";
import InfoPage from "./InfoPage";

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

  zoomOutMobile();
  return (
    <StoreProvider store={store}>
      <h1 class={styles.headerHeadline}>Stravakongen</h1>
      <Router>
        <Switch>
          <Route path={"/info"} component={InfoPage} />
          <Route
            path={"/"}
            component={props => (
              <Page {...props} segmentGroup={segmentGroup} lsClub={lsClub} />
            )}
          />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
