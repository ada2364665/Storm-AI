// src/SignUpPage.js
import React, { useState } from 'react';
import './SignUpPage.css'; // Make sure to import the CSS file

function SignUpPage() {
    const [name, setName] = useState(''); // New state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // To display success/error messages

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/signup', { // Update this URL based on your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }), // Include name in the request
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Sign-up successful!');
                setName(''); // Clear the input fields
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
            <h1>Sign Up</h1>
            <p>Create an account to get started.</p>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
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
            {message && <p className="message">{message}</p>} {/* Display success/error messages */}
        </div>
    );
}

export default SignUpPage;
