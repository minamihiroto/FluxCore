import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`auth/password-reset/`, { email });
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
          />
        </div>
        <button type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
