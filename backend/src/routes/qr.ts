import express, { Router, Request, Response } from 'express';
import QRCode from 'qrcode';
import { getAsync } from '../database';

const router: Router = express.Router();

// Generate QR code for a task
router.get('/generate/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    const qrUrl = `${baseUrl}/api/qr/scan/${taskId}`;

    const qrCode = await QRCode.toDataURL(qrUrl);
    res.json({ qrCode, url: qrUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Scan QR code and complete task
router.get('/scan/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const task = await getAsync('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Return task info (the actual completion happens via /tasks/:id/complete)
    res.json({ 
      message: 'QR code valid',
      task,
      action: 'Confirm to mark as complete'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
