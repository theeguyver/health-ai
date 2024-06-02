"use client"
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userInput = inputValue.trim();
    if (userInput === '') return;

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: userInput }]);
    sendMessage(userInput);
    setInputValue('');
  };

  const sendMessage = (message) => {
    const url = 'http://localhost:2000/chatresponse';

    setIsLoading(true);

    axios.post(url, { content: message })
      .then((response) => {
        const botResponse = response.data.response;
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: botResponse }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow p-6 mt-20 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {chatLog.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'user' && (
                  <div className="flex items-center">
                    <img src="icons8-user-16.png" alt="User Icon" className="w-auto h-auto ml-3 " />
                  </div>
                )}
                <div className={`${message.type === 'user' ? 'bg-[#140743] text-white ml-2' : 'bg-gray-800 text-white mr-1'} rounded-lg p-4`} style={{ boxShadow: 'inset 0 0 12px #bf97ff3d' }}>
                  {message.message}
                </div>
                {message.type === 'bot' && (
                  <div className="flex items-center">
                    <img src="chatbot-icon.png" alt="Chatbot Icon" className="w-auto h-auto mr-3" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white mr-1 rounded-lg p-4" style={{ boxShadow: 'inset 0 0 12px #bf97ff3d' }}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex rounded-lg border border-gray-500 bg-gray-800 fixed bottom-0 left-20 right-20 w-auto z-10">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#140743] box-shadow: inset 0 0 12px #bf97ff3d rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-black-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
