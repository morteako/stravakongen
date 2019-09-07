import React from 'react';
import Page from './Page';
import { StoreProvider, createStore, action } from 'easy-peasy';


const store = createStore({
  leaderboards : {
    all:{},
    year:{}
  },
  addLeaderboard : action((state, payload) => {
    if (!payload) return;
    state.leaderboards[payload.dateRange][payload.id] = payload.leaderboard;
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
