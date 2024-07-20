import React, { useState } from 'react';
import './App.css';
import newLogo from './newLogo.png';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
// import { Router } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import SignInButton from './SignInButton';
import SignInPage from './SignInPage'; 

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (searchQuery.trim() === '') return;

    setLoading(true);
    setError('');

    const userMessage = { type: 'user', text: searchQuery };
    setMessages([...messages, userMessage]);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [{ parts: [{ text: searchQuery }] }],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (result.candidates && result.candidates.length > 0) {
        const responseText = result.candidates[0].content.parts[0].text;

        // Check if the response is asking for more context
        if (responseText.includes("Please tell me more about what you're interested in")) {
          setMessages([...messages, userMessage, { type: 'ai', text: "It looks like I need more context to provide a tailored business idea. Could you share more details about your interests, skills, and preferences?" }]);
        } else {
          setMessages([...messages, userMessage, { type: 'ai', text: marked(responseText) }]);
        }
      } else {
        setError('No candidates returned from API.');
        setMessages([...messages, userMessage, { type: 'ai', text: "No candidates returned from the API." }]);
      }
    } catch (error) {
      console.error("Error generating content:", error.message || error);
      setError("An error occurred while generating content.");
      setMessages([...messages, userMessage, { type: 'ai', text: "An error occurred while generating content." }]);
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="app">
      <header>
        <nav>
        <SignInButton />
        </nav>
      </header>
      
      <main>
        <img 
          src={newLogo} 
          alt="newLogo" 
          className="logo"
        />
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
            {loading && <div className="message ai">Generating response...</div>}
          </div>
          <div className="input-container">
            <input 
              type="text" 
              className="chat-input"
              placeholder="Type your message here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>Send</button>
          </div>
          {error && <div className="error-message"><p>{error}</p></div>}
        </div>
      </main>
      
      <footer>
        <div className="footer-left">
          <a href="#">Building the future!</a>
        </div>
        <div className="footer-right">
          <a href="#">StormAI is powered by Google's Gemini</a>
        </div>
      </footer>
    </div>
  );
}


export default App;
