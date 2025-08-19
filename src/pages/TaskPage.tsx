import { useState } from "react";
import { useTasks } from "../hooks/useTask";
import type { Task } from "../types/taskType";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

export const TaskPage = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  const handleClick = async () => {
    try {
      await logout();
      alert('Logout realizado com sucesso, até mais.');
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError('Erro ao efetuar logout');
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <button
          className="logout"
          onClick={handleClick}
            >
          Logout
        </button>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Adicionar
        </button>
      </form>

      <div id="taskWrapper">
        {tasks.map((task: Task) => (
          <div key={task.id} className="taskCard">
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${task.done ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="remove"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}