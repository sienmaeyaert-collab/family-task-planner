import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

type FilterStatus = 'all' | 'pending' | 'completed';

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onCompleteTask
}) => {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="task-list-container">
      <div className="task-stats">
        <div className="stat">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pending</span>
          <span className="stat-value pending">{pendingCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed">{completedCount}</span>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>📝 No tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
              onComplete={onCompleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
