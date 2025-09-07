import React, { createContext, useEffect, useRef, useState } from "react";
import run from "../Gemini";
import { takeCommand } from "../Command";

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("Tap to start listening...");
  const [response, setResponse] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  let voices = [];
  const recognitionRef = useRef(null);
  const isUserInitiated = useRef(false);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
  }, []);

  // Load voices
  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }
  }

  useEffect(() => {
    loadVoices();
  }, []);

  const conversationHistory = useRef([]);

  // Load conversation history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("conversationHistory");
      if (saved) {
        conversationHistory.current = JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load conversation history:", error);
      conversationHistory.current = [];
    }
  }, []);

  function saveMemory() {
    localStorage.setItem("conversationHistory", JSON.stringify(conversationHistory.current));
  }

  // Mobile-optimized speak function
async function speak(text) {
    if (!text || text.trim() === "") return;

    try {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      // Wait for cancel to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Mobile-specific: Create utterance immediately after user interaction
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get voices - mobile browsers may need time to load
        let availableVoices = window.speechSynthesis.getVoices();
        
        // If no voices loaded, wait for them
        if (availableVoices.length === 0) {
          window.speechSynthesis.addEventListener('voiceschanged', function voicesChanged() {
            availableVoices = window.speechSynthesis.getVoices();
            window.speechSynthesis.removeEventListener('voiceschanged', voicesChanged);
            setupUtterance();
          });
        } else {
          setupUtterance();
        }

        function setupUtterance() {
          // Language detection
          const hindiPattern = /[\u0900-\u097F]/;
          const bengaliPattern = /[\u0980-\u09FF]/;
          let detectedLang = 'en';
          if (hindiPattern.test(text)) detectedLang = 'hi';
          else if (bengaliPattern.test(text)) detectedLang = 'bn';

          // Voice selection for mobile - prefer system voices with Hindi/Bengali support
          let selectedVoice = null;

          if (detectedLang === 'hi') {
            // Hindi voice priority
            selectedVoice = 
              availableVoices.find(v => v.lang === 'hi-IN') ||
              availableVoices.find(v => v.lang === 'hi') ||
              availableVoices.find(v => v.name.toLowerCase().includes('hindi')) ||
              availableVoices.find(v => v.lang === 'en-IN') ||
              availableVoices.find(v => v.localService && v.lang.startsWith("en")) ||
              availableVoices.find(v => v.lang === "en-US") ||
              availableVoices[0];
          }  else if (detectedLang === 'bn') {
            // Bengali voice priority - prefer Indian Bengali accent
            selectedVoice = 
              availableVoices.find(v => v.lang === 'bn-IN') ||
              availableVoices.find(v => v.lang === 'bn-IN' && v.name.toLowerCase().includes('female')) ||
              availableVoices.find(v => v.name.toLowerCase().includes('bengali') && v.name.toLowerCase().includes('india')) ||
              availableVoices.find(v => v.name.toLowerCase().includes('bengali') && v.name.toLowerCase().includes('indian')) ||
              availableVoices.find(v => v.name.toLowerCase().includes('bengali') && v.localService) ||
              availableVoices.find(v => v.lang === 'bn' && v.localService) ||
              // Avoid Bangladesh voices which sound foreign
              availableVoices.find(v => v.lang === 'bn' && !v.name.toLowerCase().includes('bangladesh') && !v.name.toLowerCase().includes('bd')) ||
              // If no good Bengali voice, use Indian English with slower rate
              availableVoices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female')) ||
              availableVoices.find(v => v.lang === 'en-IN') ||
              availableVoices.find(v => v.localService && v.lang.startsWith("en")) ||
              availableVoices.find(v => v.lang === "en-US") ||
              availableVoices[0];
          } else {
            // English voice priority (prefer Indian English)
            selectedVoice = 
              availableVoices.find(v => v.lang === 'en-IN') ||
              availableVoices.find(v => v.localService && v.lang.startsWith("en")) ||
              availableVoices.find(v => v.lang === "en-US") ||
              availableVoices.find(v => v.lang === "en-GB") ||
              availableVoices.find(v => v.lang.startsWith("en")) ||
              availableVoices.find(v => v.localService) ||
              availableVoices[0];
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
          } else {
            // Fallback to system default with appropriate language
            if (detectedLang === 'hi') utterance.lang = 'hi-IN';
            else if (detectedLang === 'bn') utterance.lang = 'bn-IN';
            else utterance.lang = 'en-US';
          }

          // Mobile-optimized settings with language-specific adjustments
          utterance.volume = 1.0;
          
          // Adjust rate for better clarity in different languages
          if (detectedLang === 'hi'){
             utterance.rate = 0.75;
            utterance.pitch = 1.0;
          } else if( detectedLang === 'bn') {
            utterance.rate = 0.8;
            utterance.pitch = 0.8; // Slower for Hindi/Bengali for better pronunciation
          } else {
            utterance.rate = 0.8;
            utterance.pitch = 1.0; // Standard rate for English
          }
          


          // Event handlers
          utterance.onstart = () => {
            console.log("Speech started:", text.substring(0, 50));
            setSpeaking(true);
          };

          utterance.onend = () => {
            console.log("Speech ended");
            setSpeaking(false);
            resolve();
          };

          utterance.onerror = (e) => {
            console.error("Speech synthesis error:", e.error, e.type);
            setSpeaking(false);
            
            // Try fallback for mobile
            if (e.error === 'network' || e.error === 'synthesis-failed') {
              console.log("Retrying speech synthesis...");
              setTimeout(() => {
                const fallbackUtterance = new SpeechSynthesisUtterance(text);
                fallbackUtterance.volume = 1.0;
                fallbackUtterance.rate = 0.8;
                fallbackUtterance.onend = resolve;
                window.speechSynthesis.speak(fallbackUtterance);
              }, 500);
            } else {
              resolve();
            }
          };

          // Critical for mobile: Speak immediately
          setSpeaking(true);
          window.speechSynthesis.speak(utterance);

          // Mobile backup: Check if speech actually started
          setTimeout(() => {
            if (window.speechSynthesis.speaking) {
              console.log("Speech synthesis is working");
            } else {
              console.log("Speech synthesis failed to start - trying backup");
              // Try one more time
              const backupUtterance = new SpeechSynthesisUtterance(text);
              backupUtterance.volume = 1.0;
              backupUtterance.rate = 0.8;
              backupUtterance.onend = () => {
                setSpeaking(false);
                resolve();
              };
              window.speechSynthesis.speak(backupUtterance);
            }
          }, 1000);
        }
      });

    } catch (error) {
      console.error("Speech function error:", error);
      setSpeaking(false);
    }
  }

  function cleanText(text) {
    return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "").trim();
  }

async function aiResponse(promptText) {
  try {
    const systemInstruction = "Respond concisely in 30 words or less. Use previous conversation for context if needed.";
    const context = conversationHistory.current
      .map((item) => `User: ${item.user}\nAI: ${item.ai}`)
      .join("\n");

    const fullPrompt = `${systemInstruction}\n\nPrevious conversation:\n${context}\n\nUser: ${promptText}\nAI:`;

    let text = await run(fullPrompt);
    text = cleanText(text);

    if (!text) {
      text = await run(fullPrompt);
      text = cleanText(text);
    }

    if (!text) {
      await speak("Sorry, I couldn't process that.");
      return;
    }

    const newText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/google/gi, "Suman")
      .replace(/गूगल/g, "Suman")
      .replace(/গুগল/g, "Suman");

    setResponse(true);   // Lock UI for AI response
    setPrompt(newText);  // Show AI text in UI

    conversationHistory.current.push({ user: promptText, ai: newText });
    if (conversationHistory.current.length > 50) conversationHistory.current.shift();
    saveMemory();

    console.log("AI:", newText);

    await speak(newText);  // Wait until speaking ends

    // After speaking fully ends:
    setResponse(false);
    setPrompt("Tap to start listening...");
  } catch (error) {
    console.error("AI Error:", error);
    await speak("Something went wrong, please try again.");
    setResponse(false);
  }
}


  // Initialize speech recognition
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    // Mobile-specific settings
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
      setPrompt("Listening...");
    };

   recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("Heard:", transcript);
  setPrompt(transcript);  // Show user's speech in UI
  setIsListening(false);
  takeCommand(transcript, aiResponse, setResponse, setSpeaking, setPrompt, speak);
};


    recognition.onerror = (e) => {
      console.error("SpeechRecognition error:", e.error);
      setIsListening(false);
      
      let errorMessage = "Speech recognition error";
      switch(e.error) {
        case 'network':
          errorMessage = "Network error. Please check your connection.";
          break;
        case 'not-allowed':
          errorMessage = "Microphone access denied. Please allow microphone access.";
          break;
        case 'no-speech':
          errorMessage = "No speech detected. Please try again.";
          break;
        case 'aborted':
          errorMessage = "Speech recognition aborted.";
          break;
      }
      
      setPrompt(errorMessage);
      setTimeout(() => {
        setPrompt("Tap to start listening...");
      }, 3000);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
      if (!response && !speaking) {
        setPrompt("Tap to start listening...");
      }
    };

    return recognition;
  }

  // Start listening function - must be called by user interaction
  function startListening() {
    if (!speechSupported) {
      alert("Speech recognition is not supported in this browser");
      return;
    }

    // Check for HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      alert("Speech recognition requires HTTPS. Please use a secure connection.");
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Stop previous recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Mark as user-initiated
    isUserInitiated.current = true;

    // Create new recognition instance
    recognitionRef.current = initSpeechRecognition();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start recognition:", error);
        setPrompt("Failed to start listening. Please try again.");
      }
    }
  }

  // Stop listening function
  function stopListening() {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }

  function setSpeechLanguage(lang) {
    setLanguage(lang);
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }

  const value = {
    speak,
    recognition: recognitionRef.current,
    aiResponse,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
    setSpeechLanguage,
    startListening, 
    stopListening, 
    isListening,    
    speechSupported 
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;

