// src/SignInPage.js
import React, { useState } from 'react';
import './SignInPage.css'; // Import the CSS file for styling

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/signin', { // Update this URL based on your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Sign-in successful!');
        // Optionally redirect to another page or clear the input fields
        setEmail(''); 
        setPassword('');
      } else {
        setMessage(`Error: ${result.error || 'An error occurred.'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Welcome to the Sign-In Page</h1>
      <p>Please enter your credentials to sign in.</p>
      
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display success/error messages */}
    </div>
  );
}

export default SignInPage;
