import React, { useContext, useEffect, useState, useRef } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { FaMicrophoneAlt } from "react-icons/fa";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  const { isListening, startListening, stopListening, speaking, prompt, response } =
    useContext(datacontext);

  const [showButton, setShowButton] = useState(true);
  const [userSpeech, setUserSpeech] = useState("");
  const [aiReply, setAiReply] = useState("");
  const buttonDelayRef = useRef(null);

  // Hide button immediately when any activity starts
  useEffect(() => {
    if (isListening || speaking || response) {
      setShowButton(false);
      // Clear any pending timeout
      if (buttonDelayRef.current) {
        clearTimeout(buttonDelayRef.current);
        buttonDelayRef.current = null;
      }
    }
  }, [isListening, speaking, response]);

  // Track user speech
  useEffect(() => {
    if (!isListening && prompt && 
        prompt !== "Listening..." && 
        prompt !== "Tap to start listening..." &&
        !prompt.includes("error")) {
      setUserSpeech(prompt);
    }
  }, [isListening, prompt]);

  // Track AI reply
  useEffect(() => {
    if ((response || speaking) && prompt && 
        prompt !== userSpeech && 
        prompt !== "Listening..." && 
        prompt !== "Tap to start listening...") {
      setAiReply(prompt);
    }
  }, [response, speaking, prompt, userSpeech]);

  // Show button with delay after everything is completely done
  useEffect(() => {
    if (!isListening && !speaking && !response && prompt === "Tap to start listening...") {
      if (buttonDelayRef.current) {
        clearTimeout(buttonDelayRef.current);
      }
      buttonDelayRef.current = setTimeout(() => {
        setShowButton(true);
      }, 2000);
    } else {
      // Clear timeout and hide button if active or processing
      if (buttonDelayRef.current) {
        clearTimeout(buttonDelayRef.current);
        buttonDelayRef.current = null;
      }
      setShowButton(false);
    }
  }, [isListening, speaking, response, prompt]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (buttonDelayRef.current) {
        clearTimeout(buttonDelayRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    try {
      // Clear states and hide button immediately when starting interaction
      setUserSpeech("");
      setAiReply("");
      setShowButton(false);
      
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    } catch (err) {
      console.error("Recognition error:", err);
    }
  };

  return (
    <div className="main">
      <img src={va} alt="Virtual Assistant" id="shifra" />
      <span>I am Shifra 2.0, Your Advanced Virtual Assistant</span>

      {showButton ? (
        <button onClick={handleClick} className="start-btn">
          Click here <FaMicrophoneAlt />
        </button>
      ) : isListening ? (
        <div className="response">
          <img src={speakimg} alt="Listening" id="speak" />
          <p><strong>You:</strong> Listening...</p>
        </div>
      ) : userSpeech && !aiReply ? (
        <div className="response">
          <p><strong>You:</strong> {userSpeech}</p>
          <p><strong>AI:</strong> Processing...</p>
        </div>
      ) : aiReply ? (
        <div className="response">
          <img src={aigif} alt="AI Speaking" id="aigif" />
          <p><strong>AI:</strong> {aiReply}</p>
        </div>
      ) : (
        <div className="response">
          <p><strong>AI:</strong> Please wait...</p>
        </div>
      )}
    </div>
  );
}

export default App;