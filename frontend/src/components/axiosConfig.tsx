import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access");
      alert("アクセストークンが切れました。もう一度ログインしてください。");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
