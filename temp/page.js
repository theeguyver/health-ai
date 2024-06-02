"use client"
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SessionList = ({ sessions, onSelectSession, onRemoveSession }) => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-72 h-full bg-blue-900 text-white p-4 overflow-y-auto">
      <div className="font-bold text-lg mb-4">Session History</div>
      <ul className="divide-y divide-gray-300">
        {sessions.map((session, index) => (
          <li key={index} className="py-2 cursor-pointer">
            <div onClick={() => onSelectSession(session)}>{session.sessionid}</div>
            <button className="text-red-600" onClick={(e) => onRemoveSession(e, session)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatbotPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    fetchSessionHistory(); // Fetch session history on component mount
  }, []);

  const fetchSessionHistory = () => {
    const userEmail = getCookie('userEmail');
    axios.post('http://localhost:4002/sessionhistory', { userId: userEmail })
      .then((response) => {
        if (Array.isArray(response.data.session)) {
          setSessionHistory(response.data.session);
        } else {
          console.error('Invalid session history data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching session history:', error);
      });
  };

  const handleSelectSession = (session) => {
    setSelectedSession(session);
  };

  const handleRemoveSession = (event, session) => {
    event.stopPropagation(); // Prevent parent element from being clicked
    // Implement logic to remove session data from screen without removing the session ID from the left pane
    setSelectedSession(null); // Clear selected session if removed
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userInput = inputValue.trim();
    if (userInput === '') return;

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: userInput }]);
    if (!sessionEnded) sendMessage(userInput);
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

  const endSession = () => {
    const userEmail = getCookie('userEmail');
    axios.post('http://localhost:2000/endsession', { userEmail: userEmail, endSession: true })
      .then((response) => {
        if (response.data.message === "Session Ended.") {
          console.log("{ endSession: true }")
          console.log(response.data.message);
          setSessionEnded(true);
          setShowOverlay(true);
        }
      })
      .catch((error) => {
        console.error('Error ending session:', error);
      });
  };

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + '=')) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // If cookie not found, return null
    return null;
  }

  return (
    <div className="relative h-screen flex">
      <SessionList sessions={sessionHistory} onSelectSession={handleSelectSession} onRemoveSession={handleRemoveSession} />
      <div className="flex-grow p-6 mt-20 ml-72 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          <div className="font-bold text-lg mb-4">Chat Log</div>
          {selectedSession && (
            <div>
              <div className="font-bold text-lg mb-2">{selectedSession.sessionid}</div>
              {selectedSession.sessiondata.map((message, idx) => (
                <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'user' && (
                    <div className="flex items-center">
                      <img src="icons8-user-16.png" alt="User Icon" className="w-auto h-auto ml-3 " />
                    </div>
                  )}
                  <div className={`${message.role === 'user' ? 'bg-[#140743] text-white ml-2 mb-2' : 'bg-gray-800 text-white mr-1 mb-2'} rounded-lg p-4`} style={{ boxShadow: 'inset 0 0 12px #bf97ff3d' }}>
                    {message.content}
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center">
                      <img src="chatbot-icon.png" alt="Chatbot Icon" className="w-auto h-auto mr-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
      <form onSubmit={handleSubmit} className="p-6 fixed bottom-0 left-0 right-0">
  <div className="flex rounded-lg border border-gray-500 bg-gray-800 relative w-3/5 mx-auto" style={{ marginRight: '100px' }}>
    <input
      type="text"
      className={`form-input flex-grow px-4 py-2 bg-transparent text-white focus:outline-none ${sessionEnded ? 'disabled' : ''}`}
      placeholder="Type your message..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={sessionEnded}
    />
    <button
      type="submit"
      className={`bg-[#140743] box-shadow: inset 0 0 12px #bf97ff3d rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-black-600 transition-colors duration-300 ${sessionEnded ? 'disabled' : ''}`}
      disabled={sessionEnded}
    >
      Send
    </button>
    {showOverlay && (
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          cursor: 'not-allowed'
        }}
        onMouseEnter={() => {document.body.style.cursor = 'not-allowed'}}
        onMouseLeave={() => {document.body.style.cursor = 'auto'}}
      ></div>
    )}
    <button
      type="button"
      onClick={endSession}
      className="bg-red-600 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-red-700 transition-colors duration-300"
    >
      End Session
    </button>
  </div>
</form>

    </div>
  );
};

export default ChatbotPage;
