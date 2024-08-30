import React, { useState } from 'react';
import './styles/App.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ startTimer, setUserInfo }) => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [nameError, setNameError] = useState(''); // State to hold validation error message for name
  const [rollNoError, setRollNoError] = useState(''); // State to hold validation error message for roll number
  const navigate = useNavigate(); // Use navigate instead of history

  const validateName = (name) => {
    const namePattern = /^[A-Za-z]{3,}$/; // Regex pattern for name: at least 3 letters, no special characters
    if (!namePattern.test(name)) {
      return "Name must be at least 3 letters long and contain only alphabets.";
    }
    return "";
  };

  const validateRollNo = (rollNo) => {
    const rollNoPattern = /^1601\d{8}$/; // Regex pattern for rollNo: must start with 1601 and have 8 more digits
    if (rollNo.length !== 12) {
      return "Roll No must be exactly 12 digits long.";
    } else if (!rollNoPattern.test(rollNo)) {
      return "Roll No must start with '1601' and contain only digits.";
    }
    return "";
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate name and roll number
    const nameValidationError = validateName(name);
    const rollNoValidationError = validateRollNo(rollNo);

    if (nameValidationError || rollNoValidationError) {
      setNameError(nameValidationError);
      setRollNoError(rollNoValidationError);
      return;
    }

    if (name && rollNo) { 
      setUserInfo(name, rollNo); 
      startTimer();
      navigate('/level1');
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image animate__animated"></div>
        <div className="login-form">
          <h2 className="text-2xl font-bold mb-4 animate__animated animate__fadeInLeft">Enter Your Details</h2>
          <form onSubmit={handleClick}>
            <div className="mb-4 animate__animated animate__backInDown">
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border rounded-md" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(''); // Clear error message when user modifies the input
                }} // Update state on input change
              />
              {nameError && <p className="text-red-500">{nameError}</p>} {/* Display validation error for name */}
            </div>
            <div className="mb-4 animate__animated animate__backInDown">
              <label htmlFor="roll-no" className="block text-lg font-medium">Roll No</label>
              <input 
                type="text" 
                id="roll-no" 
                className="w-full px-4 py-2 border rounded-md" 
                placeholder="Your Roll No"
                value={rollNo}
                onChange={(e) => {
                  setRollNo(e.target.value);
                  setRollNoError(''); // Clear error message when user modifies the input
                }} // Update state on input change
              />
              {rollNoError && <p className="text-red-500">{rollNoError}</p>} {/* Display validation error for roll number */}
            </div>

            <div className="row">
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-700 transition duration-300 animate__animated animate__fadeInUpBig"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
