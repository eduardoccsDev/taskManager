import { Request, Response } from 'express';
import { prisma } from '../prisma'; // importando o cliente Prisma corretamente

// Extendendo o tipo Request para incluir 'user'
interface AuthenticatedRequest extends Request {
  user: { id: number };
}

// Listar tarefas do usuário logado
export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

// Criar nova tarefa
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user.id;

  const newTask = await prisma.task.create({
    data: { title, done: false, userId }
  });

  res.status(201).json(newTask);
};

// Atualizar tarefa (toggle done)
export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user.id;

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId }
  });

  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { done: !task.done }
  });

  res.json(updatedTask);
};

// Deletar tarefa
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user.id;

  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

  await prisma.task.delete({ where: { id: taskId } });

  res.status(204).send();
};