import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Login realizado com sucesso!');
      navigate('/tasks');
    } catch (err) {
        console.log(err);
      setError('Email ou senha inválidos');
    }
  };

    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/register');
    };


  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="dark">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="loginWrapper">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block mb-2 w-full border px-2 py-1 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block mb-4 w-full border px-2 py-1 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Entrar</button>
          <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleClick}
            >
          Registrar
        </button>
      </div>
    </form>
  );
};