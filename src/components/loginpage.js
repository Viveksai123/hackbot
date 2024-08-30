import React from 'react';
import './styles/App.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image animate__animated"></div>
        <div className="login-form">
          <h2 className="text-2xl font-bold mb-4 animate__animated animate__fadeInLeft">Enter Your Details</h2>
          <form>
            <div className="mb-4 animate__animated animate__backInDown">
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 border rounded-md" placeholder="Your Name" />
            </div>
            <div className="mb-4 animate__animated animate__animated animate__backInDown">
              <label htmlFor="unique-id" className="block text-lg font-medium">Mail ID</label>
              <input type="text" id="unique-id" className="w-full px-4 py-2 border rounded-md" placeholder="Your Mail ID" />
            </div>
            <div className="row">
            <a type="submit" href="/level1"  className="px-3 py-2 text-sm bg-blue-300 text-white border border-white-300 rounded-md hover:bg-blue-500 transition duration-300 ml-[-25] mt-2 animate__animated animate__fadeInUpBig">
              Submit
            </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
