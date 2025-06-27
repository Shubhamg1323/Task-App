
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  time: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
  dragHandleProps?: any;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onUpdate,
  dragHandleProps,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`list-group-item d-flex align-items-center ${
        task.completed ? 'bg-light' : ''
      }`}
    >
      <button {...dragHandleProps} className="btn btn-link me-2 p-0" style={{ cursor: 'grab' }}>
        <i className="bi bi-grip-vertical"></i>
      </button>
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          />
          <button className="btn btn-success" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="d-flex flex-grow-1 align-items-center">
          <span
            className={`flex-grow-1 fw-bold ${
              task.completed ? 'text-decoration-line-through' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
          {task.time && <span className="me-2 text-muted">{task.time}</span>}
          <button
            className={`btn btn-sm me-2 ${task.completed ? 'btn-success' : 'btn-warning'}`}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </button>
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};
