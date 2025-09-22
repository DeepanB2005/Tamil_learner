import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Bot, User } from "lucide-react";
import { TranslationContext } from "../Translation"; // adjust path if needed

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const { translations } = useContext(TranslationContext);

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

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        // Translate transcript to selected language for input display
        let translatedInput = transcript;
        if (selectedLang !== "en") {
          translatedInput = await translateText(transcript, selectedLang);
        }
        setInput(translatedInput);
        sendMessage(translatedInput); // auto-send after silence
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    // Add selectedLang as dependency so it updates recognition handler
  }, [selectedLang]);

  // Helper: Translate text
  const translateText = async (text, target_lang) => {
    if (target_lang === "en") return text;
    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: [text], target_lang }),
      });
      const data = await res.json();
      return data.translated_text[0];
    } catch {
      return text;
    }
  };

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    // Translate user message to English if needed
    let msgForBot = msg;
    let translatedUserMsg = msg;
    if (selectedLang !== "en") {
      msgForBot = await translateText(msg, "en");
      translatedUserMsg = await translateText(msg, selectedLang);
    }

    // Always translate input to selected language (even if English)
    let inputTranslated = await translateText(msg, selectedLang);

    const userMessage = {
      text: msg,
      sender: "user",
      translated: inputTranslated !== msg ? inputTranslated : null,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgForBot }),
      });
      const data = await response.json();

      // Translate bot reply if needed
      let translatedBotMsg = data.response;
      if (selectedLang !== "en") {
        translatedBotMsg = await translateText(data.response, selectedLang);
      }

      const botMessage = {
        text: data.response,
        sender: "bot",
        translated: selectedLang !== "en" ? translatedBotMsg : null,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
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
              {msg.translated && (
                <div className="mt-1 text-xs text-gray-700 italic">
                  {msg.translated}
                </div>
              )}
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
        {/* Language Selector */}
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="en">English</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="fr">Français (French)</option>
          {/* Add more languages as needed */}
        </select>

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
