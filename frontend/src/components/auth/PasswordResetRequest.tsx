import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axiosInstance.get('auth/user/');
        if (response.status === 200) {
          setEmail(response.data.email);
          setLoggedIn(true);
        }
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkLoggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`auth/password-reset/`, { email });
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError('Error sending password reset email.');
      setMessage(null);
    }
  };

  return (
    <div>
      <h2>Password Reset Request</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={loggedIn}
          />
        </div>
        <button type="submit">メールを送信</button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
