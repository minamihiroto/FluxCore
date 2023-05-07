import React from "react";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>マイページ</h1>
      <Link to={"/password-reset"}>パスワードリセットする</Link>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Profile;
