
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Event {
  id: number;
  name: string;
  date: string;
  completed: boolean;
}

interface SortableEventItemProps {
  event: Event;
  onRemove: (id: number) => void;
  onUpdate: (id: number, updatedEvent: Event) => void;
  onToggleCompleted: (id: number) => void;
}

export const SortableEventItem: React.FC<SortableEventItemProps> = ({
  event,
  onRemove,
  onUpdate,
  onToggleCompleted,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(event.name);
  const [editedDate, setEditedDate] = useState(event.date);

  const handleUpdate = () => {
    onUpdate(event.id, {
      ...event,
      name: editedName,
      date: editedDate,
    });
    setIsEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`list-group-item d-flex align-items-center ${event.completed ? 'bg-light' : ''}`}
    >
      <button {...listeners} className="btn btn-link me-2 p-0" style={{ cursor: 'grab' }}>
        <i className="bi bi-grip-vertical"></i>
      </button>
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={event.completed}
        onChange={() => onToggleCompleted(event.id)}
      />
      {isEditing ? (
        <div className="d-flex flex-grow-1 align-items-center">
          <input
            type="text"
            className="form-control me-2"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="date"
            className="form-control me-2"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            <i className="bi bi-check"></i>
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      ) : (
        <div className="d-flex flex-grow-1 align-items-center">
            <div className={`flex-grow-1 fw-bold ${event.completed ? 'text-decoration-line-through' : ''}`}>
                {event.name}
            </div>
            <div className={`mx-3 text-muted ${event.completed ? 'text-decoration-line-through' : ''}`}>
                {new Date(event.date).toLocaleDateString()}
            </div>
            <button
                className={`btn btn-sm me-2 ${event.completed ? 'btn-success' : 'btn-warning'}`}
                onClick={() => onToggleCompleted(event.id)}
            >
                {event.completed ? 'Completed' : 'Pending'}
            </button>
            <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-danger" onClick={() => onRemove(event.id)}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
      )}
    </li>
  );
};
