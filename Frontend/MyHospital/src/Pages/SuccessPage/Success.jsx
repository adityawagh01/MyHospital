import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Success.css'; // Import the CSS for styling

function Success({ userType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = userType === 'patient' ? '/api/patients' : '/api/donors';
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [userType]);

  return (
    <div className="success-container">
      <nav className="navbar">
        <h1>Hospital Management System</h1>
        <button className="user-profile-btn">User Profile</button>
      </nav>
      <div className="content">
        <h2>Login Successful!</h2>
        <p>Welcome to our healthcare management system. Here is the list of {userType === 'donor' ? 'Patients' : 'Donors'}:</p>
        {error && <p className="error-message">{error}</p>}
        <div className="data-list">
          {data.length > 0 ? (
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  {userType === 'donor' ? `${item.name} - Condition: ${item.condition}` : `${item.name} - Blood Type: ${item.bloodType}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Success;
