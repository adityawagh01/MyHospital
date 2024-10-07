import React, { useState } from 'react';
import './Login.css';
import hospitalLogo from './hospital_logo.jpg';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/success');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src={hospitalLogo} alt="Hospital Logo" className="logo" />
      <h2>Welcome Back</h2>
      <p>Access your account to manage your health.</p>
      <MDBInput
        wrapperClass="mb-4 mdb-input"
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4 mdb-input"
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <MDBBtn className="btn-custom" onClick={handleLogin}>
        {isLoading ? 'Logging in...' : 'Login'}
      </MDBBtn>
      <div className="text-center mt-4">
        <p>Don't have an account? <a href="/signup" className="text-primary fw-bold">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
