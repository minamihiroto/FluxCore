import React, { useState, useEffect } from "react";
import { checkLoggedIn, requestPasswordReset } from "../../api/authApi";

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await checkLoggedIn();
        if (response.status === 200) {
          setEmail(response.data.email);
          setLoggedIn(true);
        }
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await requestPasswordReset(email);
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError("Error sending password reset email.");
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
