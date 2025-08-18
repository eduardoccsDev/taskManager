import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

interface LoginResponse { token: string; }

export const useAuth = () => {
  const context = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    const response = await axios.post<LoginResponse>('http://localhost:3333/auth/login', { email, password });
    context.login(response.data.token);
  };

  return { ...context, login };
};