import React from 'react';
import Page from './Page';
import { StoreProvider, createStore, action } from 'easy-peasy';

const store = createStore({
  leaderboards : {
    all:{},
    year:{}
  },
  segments : [],
  addLeaderboard : action((state, payload) => {
    if (!payload) return;

    const segment = payload.id;

    const addEntry = entry => {
      entry.segment = segment;

      const curEntries = state.leaderboards[payload.dateRange][entry.athlete_name] || {};
      curEntries[entry.segment] = entry;
      state.leaderboards[payload.dateRange][entry.athlete_name] = curEntries;
    }
    payload.leaderboard.map( addEntry );

    state.segments.push(segment);
  })

  
  
});

function App() {
  return (
    <StoreProvider store={store}>
      <Page />
    </StoreProvider>
  );
}

export default App;
