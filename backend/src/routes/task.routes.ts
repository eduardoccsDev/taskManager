import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

/**

Rotas de tarefas (CRUD)

Todas as rotas são protegidas pelo JWT via middleware authenticate
*/

// Listar todas as tarefas do usuário logado
router.get('/', authenticate, getTasks);

// Criar nova tarefa
router.post('/', authenticate, createTask);

// Atualizar tarefa (toggle done ou atualizar título)
router.put('/:id', authenticate, updateTask);

// Deletar tarefa
router.delete('/:id', authenticate, deleteTask);

export { router as taskRoutes };