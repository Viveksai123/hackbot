import React, { useState, useEffect } from 'react';
import './styles/Leaderboard.css'; // Ensure this path is correct
import { FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from your backend or API
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint/leaderboard'); // Replace with your API endpoint
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        <div className="leaderboard-list">
          {leaderboardData.length > 0 ? (
            <ul>
              {leaderboardData.map((player, index) => (
                <li key={index} className="leaderboard-item">
                  <span className="leaderboard-rank">{index + 1}. </span>
                  <span className="leaderboard-name">{player.name}</span>
                  <span className="leaderboard-score">{player.score}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading leaderboard data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
