import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = sessionStorage.getItem('token'); 
    if (!token) {
      navigate('/login'); 
    } else {
      fetchTickets(token); 
    }
  }, []);

  useEffect(() => {
    applyTabFilter();
  }, [tickets, activeTab]);

 
  const fetchTickets = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err.message);
      if (err.response && err.response.status === 401) {
       
        sessionStorage.clear(); 
        navigate('/login'); 
      }
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchTickets(sessionStorage.getItem('token'));
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/tickets/search?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setFilteredTickets(res.data);
    } catch (err) {
      console.error('Error searching tickets:', err.message);
    }
  };


  const applyTabFilter = () => {
    if (activeTab === 'all') {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(ticket =>
        activeTab === 'resolved' ? ticket.status === 'resolved' : ticket.status === 'unresolved'
      );
      setFilteredTickets(filtered);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        <h2>Dashboard</h2>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for ticket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="tickets-tabs">
          <span
            className={activeTab === 'all' ? 'active-tab' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Tickets
          </span>
          <span
            className={activeTab === 'resolved' ? 'active-tab' : ''}
            onClick={() => setActiveTab('resolved')}
          >
            Resolved
          </span>
          <span
            className={activeTab === 'unresolved' ? 'active-tab' : ''}
            onClick={() => setActiveTab('unresolved')}
          >
            Unresolved
          </span>
        </div>

        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div className="ticket-card" key={ticket._id}>
              <div className="ticket-header">
                <div>
                  <strong>Ticket# {ticket.ticketNumber}</strong>
                  <p>{ticket.message}</p>
                </div>
                <div className="ticket-time">
                  <p>Posted at {new Date(ticket.createdAt).toLocaleString()}</p>
                  <strong>{ticket.duration}</strong>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="user-info">
                  <img
                    src={ticket.userImage || "https://randomuser.me/api/portraits/men/75.jpg"}
                    alt="user"
                    className="user-avatar"
                  />
                  <div>
                    <p className="user-name">{ticket.name}</p>
                    <p className="user-details">{ticket.phone}</p>
                    <p className="user-details">{ticket.email}</p>
                  </div>
                </div>
                <a href="#" className="open-ticket">Open Ticket</a>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;