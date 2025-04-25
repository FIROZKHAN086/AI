import React, { useContext, useEffect, useRef, useState } from 'react';
import { dataContext } from '../Pages/APiProvid';
import { Mic ,CircleX} from 'lucide-react';


const GE = () => {
  const { chat, Speak, recognition, AIrespons, setChat } = useContext(dataContext);
  const [input, setInput] = useState('');
  const [voice, setVoice] = useState(false);
  const [speak, setSpeak] = useState(false);

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = input.trim();

    // Show user message and temp AI bot reply
    setChat((prev) => [...prev, { user: userMessage, bot: 'Typing...' }]);
    setInput('');
    AIrespons(userMessage);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const startVoiceRecognition = () => {
    recognition.start();
    setVoice(true);
    setSpeak(false);  // Reset AI speak state when voice recognition starts
  };

  const stopVoiceRecognition = () => {
    recognition.stop();
    setVoice(false); // Stop voice recognition
  };

  // Handle AI response and set the speak state to true
  const handleAIResponse = async (userMessage) => {
    setSpeak(true);  // Start AI speaking
    await AIrespons(userMessage);  // Get the response from AI
    setSpeak(false);  // Stop AI speaking once done
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto flex-1">
        <h1 className="text-3xl font-bold text-center text-[#facc15] mb-4">
          AI Assistant
        </h1>

        {chat.length === 0 ? (
          <p className="text-center text-gray-400">
            Start a conversation with your voice or type.
          </p>
        ) : (
          chat.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-[#262626] rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-400 mb-1">👤 You:</p>
                <p className="text-base">{item.user}</p>
              </div>
              <div className="bg-[#3f3f46] rounded-xl p-4 shadow-md ml-6 border-l-4 border-[#facc15]">
                <p className="text-sm text-gray-400 mb-1">🤖 AI:</p>
                <p className="text-base">{item.bot}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Conditionally display the loading GIFs based on voice and speak states */}
      <div className="flex justify-center items-center space-x-2">
        {voice && (
          <img
            src="/speak.gif"
            alt="Speak"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        )}
        {speak && (
          <img
            src="/aiVoice.gif"
            alt="AI Voice"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        )}
      </div>

      <div className="bg-[#1e1e1e] p-4 flex items-center gap-2 w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-xl bg-[#2e2e2e] text-white outline-none"
        />
        <button
          onClick={() => {
            handleSend();
            handleAIResponse(input);
          }}
          className="bg-[#facc15] text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          Send
        </button>
        <button
          onClick={startVoiceRecognition}
          className="ml-2 p-3 rounded-full bg-[#333] hover:bg-[#444]"
        >
         
         {voice ? <button 
         onClick={stopVoiceRecognition}
         ><CircleX /></button> : <Mic className="text-white" />}
        </button>
      </div>
    </div>
  );
};

export default GE;
