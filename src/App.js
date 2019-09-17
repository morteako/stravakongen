import React from 'react';
import Page from './Page';
import { StoreProvider, createStore, action } from 'easy-peasy';
import { allSegments } from './data/segments';

const store = createStore({
  athleteEfforts : {
    all:{},
    year:{}
  },

  segmentLeaderboards: {
    all:{},
    year:{}
  },
  
  addLeaderboard : action((state, payload) => {
    if (!payload) return;

    const segmentId = payload.id;
    state.segmentLeaderboards[payload.dateRange][segmentId] = payload.leaderboard;

    const addEntry = entry => {
      entry.segment = segmentId;

      const curEntries = state.athleteEfforts[payload.dateRange][entry.athlete_name] || {};
      curEntries[entry.segment] = entry;
      state.athleteEfforts[payload.dateRange][entry.athlete_name] = curEntries;
    }
    payload.leaderboard.forEach( addEntry );

    
  })

  
  
});

function App() {
  return (
    <StoreProvider store={store}>
      <Page segments={allSegments}/>
    </StoreProvider>
  );
}

export default App;
