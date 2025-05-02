import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('userData', JSON.stringify(res.data.userData));

    
      if (res.data.userData.role === 'admin') {
        history('/dashboard'); 
      } else {
        history('/userdash'); 
      }

      setError(null); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Invalid credentials');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <h2>Sign in to your Plexify</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <Link className="link-small" to="#">Forgot password?</Link>
        </form>

       
        {error && <div className="error-popup">{error}</div>}

        <p className="bottom-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
