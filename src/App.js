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
import SecretCodePage from './components/SecretCodePage'; // Import the new SecretCodePage
import ProtectedRoute from './components/ProtectedRoute'; // Import the updated ProtectedRoute
import { FaClock, FaTrophy } from 'react-icons/fa'; // Import the trophy icon

import './components/styles/App.css';

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
    return savedTimeLeft !== null ? parseInt(savedTimeLeft, 10) : 420; // Default to 7 minutes
  });

  const [timerRunning, setTimerRunning] = useState(() => {
    const savedTimerRunning = localStorage.getItem('timerRunning');
    return savedTimerRunning !== null ? JSON.parse(savedTimerRunning) : false;
  });

  const [timerEnded, setTimerEnded] = useState(false);

  // User Information State
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [rollnum, setRollnum] = useState(() => {
    return localStorage.getItem('rollnum') || '';
  });

  // Score State
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore !== null ? parseInt(savedScore, 10) : 0;
  });

  // Popup State
  const [isPopupVisible, setPopupVisible] = useState(false);

  const location = useLocation(); // Get the current route path

  // Timer Effect
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

  // Start Timer
  const startTimer = () => {
    setTimerRunning(true); // Start the timer
    localStorage.setItem('timerRunning', true); // Save timerRunning to localStorage
  };

  // Convert UTC to IST
  const convertToIST = (date) => {
    const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return new Date(date.getTime() + offset).toISOString();
  };

  // Send Timestamp and TimeLeft to Backend
  const sendTimestamp = () => {
    const timestampUTC = new Date(); // Current time in UTC
    const timestampIST = convertToIST(timestampUTC); // Convert to IST
    fetch('https://jsonserver-production-dc15.up.railway.app/records', {
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

  // Function to update username and rollnum
  const setUserInfo = (userName, userRollnum) => {
    setUsername(userName);
    setRollnum(userRollnum);
    localStorage.setItem('username', userName);
    localStorage.setItem('rollnum', userRollnum);
  };

  // Function to clear local storage when the timer ends
  const clearLocalStorage = () => {
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('timerRunning');
    // Optionally, clear other user-related data
  };

  // Score Persistence
  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  if (timerEnded) {
    return <div className="timer-ended">Time is up! All components are hidden.</div>;
  }

  return (
    <div>
      {(location.pathname !== '/' && location.pathname !== '/rules') && (
        <div className='space'>
        <div className='timer1'>
          <div className='row'>
            <FaClock className="clock-icon" />
            <p>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            
          </div>

        </div>
        <button onClick={handlePopupOpen} className="leaderboard-button">
              <FaTrophy /> . Show Leaderboard
            </button>
        </div>
      )}

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="leader">
            <button onClick={handlePopupClose} className="popup-close-button">Close</button>
            <Leaderboard
              username={username}
              rollnum={rollnum}
              score={score}
            />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/secret" element={<SecretCodePage />} />
        <Route 
          path="/login" 
          element={<LoginPage startTimer={startTimer} setUserInfo={setUserInfo} />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute 
              element={<HomePage />} 
            />
          } 
        />
        <Route 
          path="/rules" 
          element={
            <ProtectedRoute 
              element={<RulesPage />} 
            />
          } 
        />
        <Route 
          path="/level1" 
          element={
            <ProtectedRoute 
              element={
                <Levelone 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level2" 
          element={
            <ProtectedRoute 
              element={
                <Leveltwo 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level3" 
          element={
            <ProtectedRoute 
              element={
                <Levelthree 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level4" 
          element={
            <ProtectedRoute 
              element={
                <Levelfour 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level5" 
          element={
            <ProtectedRoute 
              element={
                <Levelfive 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level6" 
          element={
            <ProtectedRoute 
              element={
                <Levelsix 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level7" 
          element={
            <ProtectedRoute 
              element={
                <Levelseven 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/level8" 
          element={
            <ProtectedRoute 
              element={
                <Leveleight 
                  username={username} 
                  rollnum={rollnum} 
                  timeLeft={timeLeft} 
                  score={score} 
                  setScore={setScore} 
                />
              } 
            />
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute 
              element={
                <Leaderboard 
                  username={username} 
                  rollnum={rollnum} 
                  score={score} 
                />
              } 
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
