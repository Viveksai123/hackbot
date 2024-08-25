import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RulesPage from './components/Rulespage';
import LoginPage from './components/loginpage';
import Levelone from './components/Levelone';
import Leveltwo from './components/Leveltwo';
import Levelthree from './components/Levelthree';
import Levelfour from './components/Levelfour';
import Levelfive from './components/Levelfive';
import Levelsix from './components/Levelsix';
import Levelseven from './components/Levelseven';
import Leveleight from './components/Leveleight';
import Leaderboard from './components/Leaderboard';

function App() {

  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        { <Route path="/rules" element={<RulesPage />} /> }
        <Route path="/login" element={<LoginPage />} />
        <Route path="/level1" element={<Levelone />} />
        <Route path="/level2" element={<Leveltwo />} />
        <Route path="/level3" element={<Levelthree />} />
        <Route path="/level4" element={<Levelfour />} />
        <Route path="/level5" element={<Levelfive />} />
        <Route path="/level6" element={<Levelsix />} />
        <Route path="/level7" element={<Levelseven />} />
        <Route path="/level8" element={<Leveleight />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
