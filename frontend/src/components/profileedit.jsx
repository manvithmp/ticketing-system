import React, { useState } from 'react';
import Sidebar from './sidebar';
import './ProfileEdit.css';
import { FiInfo } from 'react-icons/fi'; // Using react-icons for the info icon
import Tooltip from '@mui/material/Tooltip'; // Using Material UI Tooltip
import { useNavigate } from 'react-router-dom'; // To handle navigation

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // For routing to login

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/update-profile', { // Updated URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        // Redirect to login if the password is updated
        if (profile.password) {
          alert('Please log in again with your updated credentials.');
          sessionStorage.clear(); // Clear session storage to log out
          navigate('/login'); // Redirect to login page
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="edit-settings-container">
      <Sidebar />
      <div className="edit-profile-content">
        <h1 className="settings-title">Settings</h1>
        <div className="edit-profile-card">
          <div className="edit-profile-tab">
            <span>Edit Profile</span>
            <div className="edit-profile-tab-line"></div>
          </div>
          <div className="edit-form">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <Tooltip title="Email will be updated">
                  <FiInfo className="info-icon" />
                </Tooltip>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <Tooltip title="Password change will log you out">
                  <FiInfo className="info-icon" />
                </Tooltip>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
                <Tooltip title="User will be logged out immediately">
                  <FiInfo className="info-icon" />
                </Tooltip>
              </div>
            </div>

            <div className="button-container">
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;