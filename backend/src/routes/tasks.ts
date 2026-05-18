import express, { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runAsync, getAsync, allAsync } from '../database';
import QRCode from 'qrcode';

const router: Router = express.Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await allAsync('SELECT * FROM tasks ORDER BY createdAt DESC');
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single task
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await getAsync('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, familyId } = req.body;
    const id = uuidv4();
    const qrCode = uuidv4(); // Unique QR code identifier

    await runAsync(
      `INSERT INTO tasks (id, title, description, priority, dueDate, qrCode, familyId)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description || null, priority || 'medium', dueDate || null, qrCode, familyId || null]
    );

    const task = await getAsync('SELECT * FROM tasks WHERE id = ?', [id]);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const id = req.params.id;

    await runAsync(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, dueDate = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, description || null, status, priority, dueDate || null, id]
    );

    const task = await getAsync('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await runAsync('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Mark task as complete via QR code
router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await runAsync(
      `UPDATE tasks SET status = 'completed', completedAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [id]
    );

    const task = await getAsync('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task marked as complete', task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
