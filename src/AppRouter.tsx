import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskPage } from './pages/TaskPage';
import { useAuth } from './hooks/useAuth';
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tasks" element={
        <PrivateRoute>
          <TaskPage />
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
);