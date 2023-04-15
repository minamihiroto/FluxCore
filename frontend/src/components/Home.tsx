import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem('access');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/auth/user/', config);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {username}!</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Dashboard;
