import { useState, useEffect } from 'react';
import type { Task } from '../types/taskType';

export function useTask() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) as Task[] : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(title: string) {
        const newTask: Task = {id: Date.now(), title, done: false };
        setTasks((prev) => [...prev, newTask]);
    }

    function toggleTask(id: number) {
        setTasks(tasks.map((t) => t.id === id ? {...t, done: !t.done } : t))
    }

    function removeTask(id: number) {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    return { tasks, addTask, toggleTask, removeTask };
}