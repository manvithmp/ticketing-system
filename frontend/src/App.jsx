import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';
import TeamPage from './components/teampage';
import Chatbox from './components/chatbox';
import Chatbot from './components/chatbot';
import Data from './components/datapage';
import ProfileEdit from './components/profileedit';
import ContactCenter from './components/ContactCenter'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/data" element={<Data />} />
        <Route path="/edit" element={<ProfileEdit />} />
        <Route path="/contact" element={<ContactCenter />} /> 
      </Routes>
    </Router>
  );
}

export default App;
