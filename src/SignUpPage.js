// src/SignUpPage.js
import React, { useState } from 'react';
import './SignUpPage.css'; // Make sure to import the CSS file

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add sign-up logic here
    console.log('Sign-up details:', { email, password });
  };

  return (
    <div className="sign-in-page">
      <h1>Sign Up</h1>
      <p>Create an account to get started.</p>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Email:
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
