import React from 'react';
import './SignInPage.css'; // Import a CSS file for styling if needed

function SignInPage() {
  return (
    <div className="sign-in-page">
      <h1>Welcome to the Sign-In Page</h1>
      <p>Please enter your credentials to sign in.</p>
      
      <form className="sign-in-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
