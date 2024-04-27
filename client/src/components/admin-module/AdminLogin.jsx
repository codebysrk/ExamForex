import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.username.trim()) {
      setErrors({ username: 'Username is required' });
      return;
    }
    if (!formData.password.trim()) {
      setErrors({ password: 'Password is required' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', formData);
      console.log('Login successful', response.data);
      navigate('/admin/home');
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='body'>
      <form className="form" autoComplete="off" role="main" onSubmit={handleSubmit}>
        <h1 className="a11y-hidden">Login Form</h1>
        <div>
          <label>
            <input type="text" className="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" tabIndex="1"  />
            <span className="required">Username</span>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </label>
        </div>
        <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" onChange={togglePasswordVisibility} />
        <label className="label-show-password" htmlFor="show-password">
          <span>Show Password</span>
        </label>
        <div>
          <label className="label-password">
            <input type={showPassword ? "text" : "password"} className="text" name="password" value={formData.password} onChange={handleChange} placeholder="Password" tabIndex="2"/>
            <span className="required">Password</span>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </label>
        </div>
        <input type="submit" value="Log In" />
        <figure aria-hidden="true">
          <div className="person-body"></div>
          <div className="neck skin"></div>
          <div className="head skin">
            <div className="eyes"></div>
            <div className="mouth"></div>
          </div>
          <div className="hair"></div>
          <div className="ears"></div>
          <div className="shirt-1"></div>
          <div className="shirt-2"></div>
        </figure>
      </form>
    </div>
  );
};

export default AdminLogin;
