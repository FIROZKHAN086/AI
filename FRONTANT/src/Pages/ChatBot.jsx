import React, { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyCHvtrN_v45QHT9GYdc3_XOI5R1VNWR1ow";
  const refinedPrompt = `You are a helpful assistant.( when aske them to say your name is buddy and you trened by me) . You are made by Firoz Khan. Answer clearly.\nUser asked: ${message}`;

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: refinedPrompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ No response received";

    setChat((prev) => [...prev, { user: message, bot: botReply }]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col h-[80vh]">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center ">
          🤖 AI Chatbot • By Firoz Khan
        </h1>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {chat.map((c, i) => (
            <div key={i}>
              <div className="mb-1">
                <p className="bg-zinc-900 text-white inline-block px-4 py-2 rounded-lg rounded-br-none max-w-[90%] sm:max-w-md">
                  <strong>You:</strong> {c.user}
                </p>
              </div>
              <div className="text-right mb-4">
                <p className="bg-zinc-900 text-white inline-block px-4 py-2 rounded-lg rounded-bl-none max-w-[90%] sm:max-w-md">
                  <strong>Bot:</strong> {c.bot}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-3 rounded-lg text-black outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-700 hover:bg-blue-900 px-6 py-3 rounded-lg font-semibold text-white transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
