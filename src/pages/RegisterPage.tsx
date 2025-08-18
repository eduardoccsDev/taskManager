import { useState } from 'react';
import axios from 'axios';

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

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Registrar</h1>
      {message && <p className="mb-2">{message}</p>}
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
    </form>
  );
};