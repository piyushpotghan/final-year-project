import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, there was an error.' }]);
      console.error(err);
    }
  };

  return (
    <>
      {/* Animated floating message above the chatbot button */}

      {/* Animated floating message above the chatbot button */}
      {!open && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2 rounded-full shadow-xl text-base font-semibold border-2 border-white flex items-center gap-2" style={{whiteSpace:'nowrap', filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.10))'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
              <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.15"/>
              <ellipse cx="12" cy="13.5" rx="6" ry="4.5" fill="#fff" fillOpacity="0.10"/>
              <path d="M8 10c0-2 8-2 8 0v2c0 2-8 2-8 0v-2z" fill="#fff" fillOpacity="0.20"/>
              <circle cx="9.5" cy="11.5" r="1.2" fill="#38bdf8"/>
              <circle cx="14.5" cy="11.5" r="1.2" fill="#38bdf8"/>
              <ellipse cx="12" cy="15.5" rx="2.5" ry="1" fill="#38bdf8" fillOpacity="0.7"/>
            </svg>
            <span>Hii ! I'm Your Health ChatBot</span>
          </div>
        </div>
      )}

      {/* Chatbot floating button */}

      <button
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl z-50 border-4 border-white transition-all duration-300 group overflow-hidden"
        style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chatbot"
      >
        {/* Robot face image as logo */}
        <img
          src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt="Chatbot Logo"
          className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md animate-pulse"
        />
      </button>

      {/* Chatbot window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-lg rounded-xl p-4 z-50 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-700">Health Chatbot</span>
            <button className="text-gray-400 hover:text-gray-700" onClick={() => setOpen(false)} aria-label="Close chatbot">✕</button>
          </div>
          <div className="h-64 overflow-y-scroll border p-2 mb-2 bg-gradient-to-br from-gray-50 to-blue-50 rounded space-y-2 flex flex-col">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
                {msg.sender === 'bot' && (
                  <img
                    src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                    alt="Bot"
                    className="w-7 h-7 rounded-full mr-2 border border-blue-300 shadow"
                  />
                )}
                <span
                  className={`inline-block px-4 py-2 rounded-2xl shadow-md max-w-[70%] text-sm font-medium transition-all duration-200
                    ${msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-blue-100'}
                  `}
                >
                  {msg.text}
                </span>
                {msg.sender === 'user' && (
                  <span className="w-7 h-7 ml-2"></span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex">
            <input
              className="border p-2 flex-1 rounded-l-lg"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question..."
            />
            <button
              className="bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-full flex items-center justify-center ml-2 px-6 py-2 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold text-base"
              onClick={sendMessage}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;