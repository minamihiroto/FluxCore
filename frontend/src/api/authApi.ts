import axios from 'axios';

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

export const checkLoggedIn = async () => {
  return await axiosInstance.get('auth/user/');
};

export const requestPasswordReset = async (email: string) => {
  return await axiosInstance.post(`auth/password-reset/`, { email });
};

export const activateAccount = async (uidb64: string, token: string) => {
  return await axios.get(`/auth/activate/${uidb64}/${token}/`);
};

export const loginUser = async (username: string, password: string) => {
  return await axios.post('/auth/login/', {
    username,
    password,
  });
};

export const passwordResetConfirm = async (uidb64: string, token: string, password: string) => {
  return await axios.post(`/auth/password-reset-confirm/${uidb64}/${token}/`, { password });
}

export const createUser = async (username: string, email: string, password: string) => {
  return await axios.post('/auth/register/', {
    username,
    email,
    password,
  });
}