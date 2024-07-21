import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import newLogo from "./newLogo.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { marked } from "marked";
import SignInButton from "./SignInButton";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import { Link } from "react-router-dom";
import IdeaList from "./components/IdeaList";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ideasList, setIdeasList] = useState([]);
  const chatBoxRef = useRef(null);

  const handleSend = async () => {
    if (searchQuery.trim() === "") return;

    setLoading(true);
    setError("");

    const userMessage = { type: "user", text: searchQuery };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const instruction = `Please provide an array of 10 business ideas. Each idea should be represented as an object with the following properties: 
  - \`idea\`: A brief title or name for the business idea. 
  - \`description\`: A detailed description of the business idea.

  You can also include any additional properties that you think are relevant, but make sure to include at least \`idea\` and \`description\` for each entry. Format the response as a JSON array.`;

    const requestBody = {
      contents: [{ parts: [{ text: `${searchQuery}\n\n${instruction}` }] }],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    };
    setSearchQuery("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.candidates && result.candidates.length > 0) {
        const responseText = result.candidates[0].content.parts[0].text;

        try {
          const ideas = JSON.parse(responseText);

          if (Array.isArray(ideas) && ideas.length === 10) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "ai", text: "Here are 10 business ideas:" },
            ]);
            setIdeasList((prevIdeasList) => [...prevIdeasList, ...ideas]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: "ai", text: "No valid ideas returned from the API." },
            ]);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "ai",
              text: "Received data is not in the expected format.",
            },
          ]);
        }
      } else {
        setError("No candidates returned from API.");
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", text: "No candidates returned from the API." },
        ]);
      }
    } catch (error) {
      console.error("Error generating content:", error.message || error);
      setError("An error occurred while generating content.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: "An error occurred while generating content." },
      ]);
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  const handleApprove = (index) => {
    console.log(`Idea ${index} approved`);
  };

  const handleDecline = (index) => {
    console.log(`Idea ${index} declined`);
  };

  return (
    <div className="app">
      <header>
        <div className="header-title">Brainstroming the future:✨StormAI✨</div>
        <nav>
          <Link to="/signin">
            <button className="button-circle">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="button-circle">Sign Up</button>
          </Link>
        </nav>
      </header>

      <main>
        <div className="chat-container">
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
            {loading && (
              <div className="message ai">Generating response...</div>
            )}
            {ideasList.length > 0 && (
              <IdeaList
                idea={ideasList}
                onApprove={handleApprove}
                onDecline={handleDecline}
              />
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              className="chat-input"
              placeholder='What is "the next Billion dollar idea"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="footer-left">
          <a href="#">No one is perfect, including me.</a>
        </div>
        <div className="footer-right">
          <a href="#">Powered by Gemini Pro.</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
