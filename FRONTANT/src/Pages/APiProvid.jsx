import React, { createContext, useState } from 'react';
import main from './GEmini.js';

export const dataContext = createContext();

const APiProvid = ({ children }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState('');

  function Speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speak);
    return text_speak;
  }

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    setMessage(transcript); 
    console.log('User said:', transcript);
    setChat((prev) => [...prev, { user: transcript, bot: "Typing..." }]);
    AIrespons(transcript);
  };

  recognition.onerror = (e) => {
    console.error('Speech error:', e);
  };

  async function AIrespons(prompt) {
    let reply = '';
    await main(prompt, (chunkText) => {
      reply += chunkText;
  
      // Replace last message's bot content
      setChat((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, bot: reply } : msg
        )
      );
    });
    Speak(reply);
  }

  const value = {
    Speak,
    recognition,
    data,
    setData,
    text,
    setText,
    chat,
    setChat,
    message,
    AIrespons
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
};

export default APiProvid;
