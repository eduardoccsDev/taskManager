import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';
import type { Task } from '../types/taskType';

export const useTasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!token) return;

    // Tipando a resposta como Task[]
    axios.get<Task[]>('http://localhost:3333/api', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(console.error);
  }, [token]);

  const addTask = async (title: string) => {
    const res = await axios.post<Task>(
      'http://localhost:3333/api',
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(prev => [...prev, res.data]);
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const res = await axios.put<Task>(
      `http://localhost:3333/api/${id}`,
      { done: !task.done },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(prev => prev.map(t => t.id === id ? res.data : t));
  };

  const removeTask = async (id: number) => {
    await axios.delete(`http://localhost:3333/api/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, addTask, toggleTask, removeTask };
};
