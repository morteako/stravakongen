import React from 'react';
import Reddit from './Reddit';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Route path={`/`} component={Reddit} />
    </Router>
  );
}

export default App;
