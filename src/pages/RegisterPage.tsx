import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/auth/register', { name, email, password });
      setMessage('Cadastro realizado com sucesso!');
    } catch (err) {
        console.log(err);
      setMessage('Erro ao cadastrar usuário');
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="dark">Registrar</h1>
      {message && <p className="mb-2">{message}</p>}
      <div className="registerWrapper">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mb-2 w-full border px-2 py-1 rounded"
          required
        />
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
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Registrar</button>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleClick}
            >
          Login
        </button>
      </div>
    </form>
  );
};