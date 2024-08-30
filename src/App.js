import React, { useState, useEffect } from 'react';
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
import { FaClock } from 'react-icons/fa';
import './components/styles/App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [timerEnded, setTimerEnded] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false); // New state to control timer

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setTimerEnded(true);
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    setTimerRunning(true); // Start the timer
  };

  const convertToIST = (date) => {
    const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(date.getTime() + offset).toISOString();
  };

  const sendTimestamp = () => {
    const timestampUTC = new Date(); // Current time in UTC
    const timestampIST = convertToIST(timestampUTC); // Convert to IST
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timestamp: timestampIST, timeLeft }), // Send both timestamp and timeLeft
    })
    .then(response => response.json())
    .then(data => {
      console.log('Timestamp and timeLeft sent:', data);
    })
    .catch(error => {
      console.error('Error sending timestamp and timeLeft:', error);
    });
  };

  if (timerEnded) {
    return <div>Time is up! All components are hidden.</div>;
  }

  return (
    <div>
      <div className='timer1'>
        <div className='row'>
      <FaClock className="clock-icon" />
        <p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p></div>
        <div>
        {!timerRunning && <button onClick={startTimer}>Start Timer</button>} {/* Button to start timer */}
        <button onClick={sendTimestamp}>Send Timestamp</button>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/login" element={<LoginPage startTimer={startTimer}/>} />
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
