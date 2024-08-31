import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./styles/index.css"
function SecretCodePage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === 'JK') {
      localStorage.setItem('secretCode', 'true');
      navigate('/');
    } else {
      alert('Incorrect code!');
    }
  };

  return (
    <div className='row'>
      <h2>Enter Secret Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter secret code"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SecretCodePage;
