import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar'; 
import './ContactCenter.css';

const ContactCenter = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMessage, setNewMessage] = useState('');

 
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/auth/teammembers/find');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); 
      }
      const data = await response.json(); 
      console.log('Team Members:', data); 
      setTeamMembers(data);

      
      updateDummyChatsWithTeamMembers(data);
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

 
  const updateDummyChatsWithTeamMembers = (members) => {
    const dummyChats = [
      {
        id: 'dummy1',
        ticketId: 'TICKET-001',
        customer: {
          name: 'Alice Johnson',
          phone: '+1 (123) 456-7890',
          email: 'alice@example.com',
          profilePic: 'https://via.placeholder.com/30',
        },
        assignedTo: members[0]?.fullName || 'Unassigned', 
        status: 'Unresolved',
        messages: [
          {
            sender: 'Customer',
            message: 'Hi, I need help with my order.',
            timestamp: new Date().toISOString(),
          },
        ],
      },
      {
        id: 'dummy2',
        ticketId: 'TICKET-002',
        customer: {
          name: 'Bob Williams',
          phone: '+1 (987) 654-3210',
          email: 'bob@example.com',
          profilePic: 'https://via.placeholder.com/30',
        },
        assignedTo: members[1]?.fullName || members[0]?.fullName || 'Unassigned', 
        status: 'Unresolved',
        messages: [
          {
            sender: 'Customer',
            message: 'Can you check the status of my refund?',
            timestamp: new Date().toISOString(),
          },
        ],
      },
    ];

    setChats(dummyChats); 
  };

  useEffect(() => {
    
    const initialDummyChats = [
      {
        id: 'dummy1',
        ticketId: 'TICKET-001',
        customer: {
          name: 'Alice Johnson',
          phone: '+1 (123) 456-7890',
          email: 'alice@example.com',
          profilePic: 'https://via.placeholder.com/30',
        },
        assignedTo: 'Unassigned',
        status: 'Unresolved',
        messages: [
          {
            sender: 'Customer',
            message: 'Hi, I need help with my order.',
            timestamp: new Date().toISOString(),
          },
        ],
      },
      {
        id: 'dummy2',
        ticketId: 'TICKET-002',
        customer: {
          name: 'Bob Williams',
          phone: '+1 (987) 654-3210',
          email: 'bob@example.com',
          profilePic: 'https://via.placeholder.com/30',
        },
        assignedTo: 'Unassigned',
        status: 'Unresolved',
        messages: [
          {
            sender: 'Customer',
            message: 'Can you check the status of my refund?',
            timestamp: new Date().toISOString(),
          },
        ],
      },
    ];

    setChats(initialDummyChats); 

   
    fetchTeamMembers();
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleAssignTeamMember = (e) => {
    const updatedChat = { ...selectedChat, assignedTo: e.target.value };
    setSelectedChat(updatedChat);
    setChats(chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)));
  };

  const handleStatusChange = (e) => {
    const updatedChat = { ...selectedChat, status: e.target.value };
    setSelectedChat(updatedChat);
    setChats(chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || selectedChat?.status === 'Resolved') return;

    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        {
          sender: 'Agent',
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setSelectedChat(updatedChat);
    setChats(chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)));
    setNewMessage('');
  };

  return (
    <div className="contact-center-wrapper">
      <Sidebar /> 

      <div className="contact-center-page">
       
        <div className="chats-section">
          <h2>Contact Center</h2>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleChatSelect(chat)}
              >
                <img src={chat.customer.profilePic || 'https://via.placeholder.com/30'} alt="Profile" />
                <div>
                  <div className="chat-name">{chat.customer.name}</div>
                  <div className="chat-message">{chat.messages[0]?.message || 'No message'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="chat-section">
          {selectedChat ? (
            <>
              <div className="chat-header">
                Ticket# {selectedChat.ticketId}
              </div>
              <div className="chat-body">
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender === 'Agent' ? 'agent-message' : ''}`}
                  >
                    <span className="chat-user">{msg.sender}</span>
                    <p>{msg.message}</p>
                    <div className="date">{new Date(msg.timestamp).toLocaleString()}</div>
                  </div>
                ))}
                {selectedChat.status === 'Resolved' && (
                  <div className="chat-closed-popup">Chat has been closed.</div>
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type here"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={selectedChat.status === 'Resolved'}
                />
                <button onClick={handleSendMessage}>&#10148;</button>
              </div>
            </>
          ) : (
            <div className="select-chat-placeholder">Select a chat to view details</div>
          )}
        </div>

       
        <div className="details-section">
          {selectedChat && (
            <>
              <div className="details-header">
                <img src={selectedChat.customer.profilePic || 'https://via.placeholder.com/40'} alt="Profile" />
                <span>{selectedChat.customer.name}</span>
              </div>
              <div className="details-body">
                <h4>Details</h4>
                <input type="text" value={selectedChat.customer.name} disabled />
                <input type="text" value={selectedChat.customer.phone} disabled />
                <input type="email" value={selectedChat.customer.email} disabled />
                <h4>Teammates</h4>
                <select
                  value={selectedChat.assignedTo}
                  onChange={handleAssignTeamMember}
                >
                  <option value="" disabled>Select Team Member</option>
                  {teamMembers.map((member) => (
                    <option key={member._id} value={member.fullName}>
                      {member.fullName}
                    </option>
                  ))}
                </select>
                <h4>Ticket Status</h4>
                <select
                  value={selectedChat.status}
                  onChange={handleStatusChange}
                >
                  <option value="Unresolved">Unresolved</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCenter;