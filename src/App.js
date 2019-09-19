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
  segments:{},
  
  addSegment : action((state, segment) => {
    if (!segment) return;
    const {name,distance,average_grade} = segment
    state.segments[segment.id] = {name,distance,average_grade};
  }),
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

const zoomOutMobile = () => {
  const viewport = document.querySelector('meta[name="viewport"]');

  if ( viewport ) {
    viewport.content = 'initial-scale=1';
    viewport.content = 'width=device-width';
  }
}

function App() {
  zoomOutMobile();
  return (
    <StoreProvider store={store}>
      <Page segments={allSegments}/>
    </StoreProvider>
  );
}

export default App;
