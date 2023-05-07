import React from "react";
import { Link } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <div>
      <h1>管理ページ</h1>
      <Link to={"/register"}>新規ユーザー登録へ</Link>
    </div>
  );
};

export default Admin;
