import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbox = ({ ticketId, chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const fetchChat = async () => {
    try {
      
      const res = await axios.get(`http://localhost:5000/api/chat/${chatId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 5000); 
    return () => clearInterval(interval);
  }, [chatId]);

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:5000/api/chat/${chatId}/message`, {
        sender: "USER_ID", 
        message: input
      });
      setInput('');
      fetchChat();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-window">
      <h3>Chat Window</h3>
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Type your message..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbox;
