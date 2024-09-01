import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./styles/index.css"

function SecretCodePage() {
  localStorage.setItem('secretCode', 'false');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code ==='hii') {
      localStorage.setItem('secretCode', 'true');
      navigate('/');
    } else {
      alert('Incorrect code!');
    }
  };

  return (
    <div className='popup'>
      <div>
      <h2>Enter Secret Code :</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter secret code"
        /><br></br>
        <button type="submit"           className="px-3 py-2 text-sm bg-blue text-white border border-white-300 rounded-md hover:bg-gray-800 transition duration-300 ml-[-25] mt-2 animate__animated animate__fadeInUpBig">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default SecretCodePage;
