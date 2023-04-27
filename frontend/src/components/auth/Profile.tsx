import { Link } from "react-router-dom";
import React from "react";

const Profile: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <div>
      <Link to={"/register"}>新規ユーザー登録へ</Link>
      <Link to={"/password-reset"}>パスワードリセットする</Link>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Profile;
