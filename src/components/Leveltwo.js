import React, { useState, useEffect } from 'react';
import "animate.css";
import { useNavigate } from 'react-router-dom';
import './styles/Level1Page.css'; // Ensure this path is correct
import Level1Img from './images/1267912.jpg';
import LeftImage from './images/SATARCLEFTIMAGE.png'; // Import the image for the left side
import ParticlesComponent from '../components/ParticlesComponent'; 
import { FaClock, FaPaperPlane, FaStar } from 'react-icons/fa'; // Import icons
import { GiLightningStorm } from 'react-icons/gi'; // Example import
import CryptoJS from 'crypto-js';

const Levelone = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(1800); // 30 minutes in seconds
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [response, setResponse] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [castSpellAnswer, setCastSpellAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);
  const [isSpellValidated, setIsSpellValidated] = useState(false);
  const totalLevels = 8;
  const currentLevel = 2; // Set current level directly as a constant

  // Example hash (replace this with your actual hash)
  const hashedPassword = '88a553b7257e652b1e6ee589bd8f77c15ed0d462f15b7c0f06791aa964890acf'; // Example SHA-256 hash

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Send the submitted answer to the backend
      const res = await fetch('/api/generate-2/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: password }),
      });

      const data = await res.json();
      setResponse(data.response);

    } catch (error) {
      console.error('An error occurred:', error);
      setResponse('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = () => {
    try {
      const submittedAnswerHash = CryptoJS.SHA256(submittedAnswer).toString();
      if (submittedAnswerHash === hashedPassword) {
        setValidationResult('Correct! Now cast the spell.');
        setSuccessPopupVisible(true);
      } else {
        setValidationResult('Incorrect. Try again.');
        setSuccessPopupVisible(false);
      }
    } catch (error) {
      console.error('Error validating the answer:', error);
      setSuccessPopupVisible(false);
      setValidationResult('An error occurred.');
    }
  };

  const handleCastSpell = () => {
    const dummyPassword = 'Malware'; // Dummy password for testing
    if (castSpellAnswer === dummyPassword) {
      setIsSpellValidated(true); // Spell validated successfully
    } else {
      alert('Incorrect password for casting spell. Try again.');
    }
  };

  const handleNextLevel = () => {
    navigate(`/level${currentLevel + 1}`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const progressPercentage = (currentLevel / totalLevels) * 100; // Adjust progress percentage calculation

  return (
    <div className="level1-page">
      <ParticlesComponent id="tsparticles" />
      <div className="content-container">
        <div className="left-side animate__animated animate__backInDown">
          <img src={LeftImage} alt="Left Side" className="left-image" />
        </div>
        <div className="center-container">
          <div className="bordered-container">
            <div className="container">
              <div className="level-header animate__animated animate__backInRight">
                <span className="level-indicator">You Are In LEVEL 2</span>
              </div>
              <p className="instruction-text animate__animated animate__backInLeft">
                Your goal is to make Master reveal the secret password for each level. However, Master will upgrade the defenses after each successful password guess!
              </p>
              <div className="levels-progress animate__animated animate__backInRight">
                <p className="levels-passed">Levels Passed: {currentLevel - 1} / {totalLevels}</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
              <div className="image-section">
                <img src={Level1Img} alt="Expecto Patronum" className='animate__animated animate__bounce'/>
                <p className='animate__animated animate__backInLeft'>I am happy to reveal the password.</p>
              </div>
              <div className="password-section">
                <div className="input-wrapper animate__animated animate__fadeInUpBig">
                  <textarea
                    className="password-input"
                    placeholder="Enter your prompt here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FaPaperPlane onClick={handleSubmit} className="submit-icon" />
                </div>
                <p className="response-text">{response}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side animate__animated animate__fadeInBottomRight" style={{ marginTop: '150px' }}>
          <div className="timer">
            <FaClock className="clock-icon" />
            {formatTime(time)}
          </div>
          <div className="validation-section">
            <p style={{ marginBottom: '10px' }}>Validate the spell 1:</p>
            <div className="input-wrapper1">
              <div className='childinputwrap'>
              <input
                type="text"
                value={submittedAnswer}
                onChange={(e) => setSubmittedAnswer(e.target.value)}
              />
              <GiLightningStorm onClick={handleValidate} className="validate-icon" />
              </div>
              <div><p className="validation-text">{validationResult}</p></div>
            </div>
          </div>
        </div>
      </div>
      {isSuccessPopupVisible && (
        <div className="success-popup animate__animated animate__fadeInDownBig">
          <div className="popup-content">
            <h2>Congratulations!</h2>
            <div className="stars">
              <FaStar className="star-icon" />
              <FaStar className="star-icon center" />
              <FaStar className="star-icon" />
            </div>
            {isSpellValidated ? (
              <div>
                <p>You have successfully cast the spell. Here’s to learning a new one!</p>
                <button onClick={handleNextLevel}>Next Level</button>
              </div>
            ) : (
              <div>
                <h1 className='heading'>"Malware"</h1>
                <p> A security device or software that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks.</p>
                <p>Cast the spell to proceed:</p>
                <br/>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={castSpellAnswer}
                    onChange={(e) => setCastSpellAnswer(e.target.value)}
                  />
                  <GiLightningStorm onClick={handleCastSpell} className="cast-spell-icon" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Levelone;
