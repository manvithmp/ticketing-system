import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiBarChart2,
  FiMessageCircle,
  FiUsers,
  FiSettings,
  FiPhone
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo"></div>
      <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
        <FiHome className="icon" />
        <span>Home</span>
      </Link>
      <Link to="/dashboard" className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
        <FiBarChart2 className="icon" />
        <span>Dashboard</span>
      </Link>
      <Link to="/chatbot" className={`sidebar-link ${location.pathname === '/chatbot' ? 'active' : ''}`}>
        <FiMessageCircle className="icon" />
        <span>Chatbox</span>
      </Link>
      <Link to="/data" className={`sidebar-link ${location.pathname === '/data' ? 'active' : ''}`}>
        <FiBarChart2 className="icon" />
        <span>Data</span>
      </Link>
      <Link to="/team" className={`sidebar-link ${location.pathname === '/team' ? 'active' : ''}`}>
        <FiUsers className="icon" />
        <span>Team</span>
      </Link>
      <Link to="/edit" className={`sidebar-link ${location.pathname === '/edit' ? 'active' : ''}`}>
        <FiSettings className="icon" />
        <span>Settings</span>
      </Link>
      <Link to="/contact" className={`sidebar-link ${location.pathname === '/contact' ? 'active' : ''}`}>
        <FiPhone className="icon" />
        <span>Contact Center</span>
      </Link>
    </div>
  );
};

export default Sidebar;
