import React, { useState } from 'react';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 text-center text-xl font-bold border-b">
        Gemini Chatbot
      </header>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-gray-900 mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="my-2 p-3 rounded-lg bg-gray-300 text-gray-900 mr-auto">
            Typing...
          </div>
        )}
      </div>
      <div className="p-4 bg-white border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              sendMessage();
            }
          }}
          className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;