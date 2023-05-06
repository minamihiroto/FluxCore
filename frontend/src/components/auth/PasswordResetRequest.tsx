import React, { useState, useEffect } from "react";
import { checkLoggedIn, requestPasswordReset } from "../../api/authApi";
import styles from "./style/PasswordResetRequest.module.css";
import { Link } from "react-router-dom";

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
    <div className={styles.container}>
      <h2 className={styles.title}>パスワードリセット</h2>
      {message && (
        <p className={`${styles.message} ${styles.success}`}>{message}</p>
      )}
      {error && <p className={styles.message}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={loggedIn}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          メールを送信
        </button>
      </form>
      {!email && (
        <Link to={"/"} className={styles.link}>
          ログインへ
        </Link>
      )}
    </div>
  );
};

export default PasswordResetRequest;
