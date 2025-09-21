import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Bot, User } from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript); // auto-send after silence
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    const userMessage = { text: msg, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "⚠️ Sorry, something went wrong.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-100 via-white to-green-300">


      {/* Chat Section */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center mr-2 shadow">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-md text-sm md:text-base whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-br-none"
                  : "bg-gradient-to-r from-orange-200 to-green-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-full flex items-center justify-center ml-2 shadow">
                <User size={18} />
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center space-x-2 bg-green-300 p-3 rounded-2xl shadow-md w-fit"
          >
            <div className="animate-bounce w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-150"></div>
            <div className="animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-300"></div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-green-100 border-t flex items-center space-x-2 sticky bottom-0">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full shadow-md transition transform hover:scale-105 active:scale-95 ${
            isListening ? "bg-red-500 text-white" : "bg-red-700 text-green-600"
          }`}
        >
          <Mic />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              sendMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
          disabled={isLoading}
        />

        <button
          onClick={() => sendMessage()}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-md hover:bg-gradient-to-r from-blue-500 to-green-700 transition transform hover:scale-105 active:scale-95"
          disabled={isLoading}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
