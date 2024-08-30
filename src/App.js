import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import './components/styles/App.css'

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem('timeLeft');
    return savedTimeLeft !== null ? parseInt(savedTimeLeft, 10) : 1800; // Default to 30 minutes
  });

  const [timerRunning, setTimerRunning] = useState(() => {
    const savedTimerRunning = localStorage.getItem('timerRunning');
    return savedTimerRunning !== null ? JSON.parse(savedTimerRunning) : false;
  });

  const [timerEnded, setTimerEnded] = useState(false);
  
  // New states for name and rollnum
  const [name, setName] = useState('');
  const [rollnum, setRollnum] = useState('');

  const location = useLocation(); // Get the current route path

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          localStorage.setItem('timeLeft', newTimeLeft); // Save timeLeft to localStorage
          return newTimeLeft;
        });
      }, 1000);
    } else if (timeLeft <= 0) {
      setTimerEnded(true);
      setTimerRunning(false); // Stop the timer
      clearLocalStorage(); // Clear the local storage
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    setTimerRunning(true); // Start the timer
    localStorage.setItem('timerRunning', true); // Save timerRunning to localStorage
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

  // Function to update name and rollnum
  const setUserInfo = (userName, userRollnum) => {
    setName(userName);
    setRollnum(userRollnum);
  };

  // Function to clear local storage when the timer ends
  const clearLocalStorage = () => {
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('timerRunning');
  };

  if (timerEnded) {
    return <div>Time is up! All components are hidden.</div>;
  }

  return (
    <div>
      {(location.pathname !== '/' && location.pathname !== '/rules') && (
        <div className='timer1'>
          <p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          {!timerRunning && <button onClick={startTimer}>Start Timer</button>} {/* Button to start timer */}
          <button onClick={sendTimestamp}>Send Timestamp</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/login" element={<LoginPage startTimer={startTimer} setUserInfo={setUserInfo} />} />
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
    </div>
  );
}



export default App;
