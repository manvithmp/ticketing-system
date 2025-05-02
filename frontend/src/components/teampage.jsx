import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import './Team.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', role: 'Member' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch team members on component mount
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/team');
        setTeam(res.data); // Set the fetched team members
      } catch (err) {
        console.error('Error fetching team members:', err.message);
      }
    };

    fetchTeam();
  }, []);

  // Handle input change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for adding or editing
  const openModal = (index = null) => {
    if (index !== null) {
      setFormData(team[index]);
      setIsEditing(true);
      setEditIndex(index);
    } else {
      setFormData({ fullName: '', phone: '', email: '', role: 'Member' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({ fullName: '', phone: '', email: '', role: 'Member' });
    setIsEditing(false);
    setEditIndex(null);
  };

  // Handle form submission for adding or updating team members
  const handleSubmit = async () => {
    try {
      if (isEditing && editIndex !== null) {
        const memberId = team[editIndex]._id; // Get the ID of the team member being edited
        const res = await axios.put(`http://localhost:5000/api/team/${memberId}`, formData);
        const updatedTeam = [...team];
        updatedTeam[editIndex] = res.data.member;
        setTeam(updatedTeam);
      } else {
        const res = await axios.post('http://localhost:5000/api/team', formData);
        setTeam([...team, res.data.member]);
      }
    } catch (err) {
      console.error('Error submitting team member:', err.message);
    } finally {
      closeModal();
    }
  };

  // Handle delete click
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  // Confirm delete operation
  const confirmDelete = async () => {
    try {
      const memberId = team[deleteIndex]._id; // Get the ID of the team member to delete
      await axios.delete(`http://localhost:5000/api/team/${memberId}`);
      const updatedTeam = [...team];
      updatedTeam.splice(deleteIndex, 1);
      setTeam(updatedTeam);
    } catch (err) {
      console.error('Error deleting team member:', err.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="team-container">
      <Sidebar />
      <div className="team-content">
        <h2>Team</h2>
        <table className="team-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={index}>
                <td className="user-cell">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.fullName}`} alt="avatar" />
                  {member.fullName}
                </td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td className="actions">
                  <FiEdit2 className="action-icon" onClick={() => openModal(index)} />
                  <FiTrash2 className="action-icon" onClick={() => handleDeleteClick(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-btn" onClick={() => openModal()}>➕ Add Team members</button>

        {/* Add/Edit Member Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{isEditing ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
              <div className="modal-actions">
                <button onClick={handleSubmit}>{isEditing ? 'Update' : 'Add'}</button>
                <button onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal">
              <h4>Confirm Delete</h4>
              <p>Are you sure you want to delete this member?</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="delete-confirm-btn" onClick={confirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;