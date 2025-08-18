// src/controllers/task.controller.ts
import { Response } from 'express';
import { prisma } from '../prisma';
import { JwtPayload } from '../middleware/auth.middleware';
import { Request } from 'express';

// Extend the Request type to include user
interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Listar tarefas do usuário logado
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Usuário não autenticado' });

    const tasks = await prisma.task.findMany({ 
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

// Criar nova tarefa
export const createTask = async (req: AuthRequest, res: Response) => {
  console.log('=== Create Task Request ===');
  console.log('Headers:', req.headers);
  console.log('User from request:', req.user);
  console.log('Request body:', req.body);
  
  try {
    const userId = req.user?.id;
    console.log('User ID from token:', userId);
    
    if (!userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { title } = req.body;
    if (!title) {
      console.log('No title provided in request');
      return res.status(400).json({ message: 'Título é obrigatório' });
    }

    console.log('Creating task with:', { title, userId });
    const newTask = await prisma.task.create({
      data: { 
        title, 
        done: false, 
        userId 
      }
    });

    console.log('Task created successfully:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ 
      message: 'Erro ao criar tarefa',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Atualizar tarefa (toggle done)
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Usuário não autenticado' });

    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) return res.status(400).json({ message: 'ID inválido' });

    const task = await prisma.task.findFirst({
      where: { id: taskId, userId }
    });

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { done: !task.done }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Deletar tarefa
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Usuário não autenticado' });

    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) return res.status(400).json({ message: 'ID inválido' });

    const task = await prisma.task.findFirst({ 
      where: { id: taskId, userId } 
    });
    
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    await prisma.task.delete({ where: { id: taskId } });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};