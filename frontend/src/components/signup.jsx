import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    adminId: ''
  });

  const history = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log(res.data);
      history('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <img src="/logo.svg" alt="Logo" className="logo" />
        <div className="signup-header">
          <h2>Create an account</h2>
          <Link to="/login" className="link-small">Sign in instead</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="First name" onChange={handleChange} required />
          <input name="lastname" placeholder="Last name" />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input name="confirmPassword" placeholder="Confirm Password" type="password" required />
          <div className="checkbox">
            <input type="checkbox" required />
            <span>
              By creating an account, I agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
            </span>
          </div>
          <button type="submit">Create an account</button>
        </form>
        <p className="legal-text">
          This site is protected by reCAPTCHA and the<br />
          <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </p>
      </div>
      <div className="image-section register-image"></div>
    </div>
  );
};

export default SignUp;
