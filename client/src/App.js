
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import { createContext, useState } from 'react';

export const WatchedContext = createContext();

function App() {

  const [watched, setWatched] = useState([]);

  return (
    <WatchedContext.Provider value={ {watched, setWatched} }>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </WatchedContext.Provider>
  );
}

export default App;
