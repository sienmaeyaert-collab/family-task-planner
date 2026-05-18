import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './TaskCard.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onDelete,
  onComplete
}) => {
  const [showQR, setShowQR] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="due-date">📅 {formatDate(task.dueDate)}</span>
        <span className={`status-badge ${task.status}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {showQR && (
        <div className="qr-section">
          <p className="qr-label">Scan to mark as complete:</p>
          <QRCode
            value={`http://localhost:5000/api/qr/scan/${task.id}`}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
      )}

      <div className="task-actions">
        {!isCompleted && (
          <>
            <button
              className="btn-complete"
              onClick={() => onComplete(task.id)}
              title="Mark as complete"
            >
              ✓ Complete
            </button>
            <button
              className="btn-qr"
              onClick={() => setShowQR(!showQR)}
              title="Show QR code"
            >
              {showQR ? '✕ Hide QR' : '📱 QR Code'}
            </button>
          </>
        )}
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
