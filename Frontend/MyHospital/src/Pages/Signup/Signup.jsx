import React, { useState } from 'react';
import './Signup.css';
import hospitalLogo from './hospital_logo.jpg';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');  // Default is patient
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        userType,
      });
      navigate('/login');
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <img src={hospitalLogo} alt="Hospital Logo" className="logo" />
      <h2>Create Your Account</h2>
      <p>Join our healthcare network today!</p>
      <div className='user-inputs'>
        <MDBInput
            wrapperClass="mb-4 mdb-input"
            label="Full Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
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
      </div>

      {/* User Type Dropdown */}
      <div className="dropdown-group">
        <p className="user-type-label">I am signing up as a:</p>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="dropdown"
        >
          <option value="patient">Patient</option>
          <option value="donor">Donor</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}
      <MDBBtn className="btn-custom" onClick={handleSignup}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </MDBBtn>
      <div className="text-center mt-4">
        <p className="mb-0">Already have an account? <a href="/login" className="text-primary fw-bold">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
