import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignInButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/signin');
  };
  
  return (
    <button className="SignInButton" onClick={handleClick}>Sign in</button>
  );
}

export default SignInButton;
