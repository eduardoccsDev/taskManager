import { useState } from "react";
import { useTasks } from "../hooks/useTask";
import type { Task } from "../types/taskType";

export const TaskPage = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>

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

      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${task.done ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}