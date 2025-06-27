
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  purchased: boolean;
}

interface SortableShoppingItemProps {
  item: Item;
  onRemove: (id: number) => void;
  onUpdate: (id: number, updatedItem: Item) => void;
  onTogglePurchased: (id: number) => void;
}

export const SortableShoppingItem: React.FC<SortableShoppingItemProps> = ({
  item,
  onRemove,
  onUpdate,
  onTogglePurchased,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);
  const [editedUnit, setEditedUnit] = useState(item.unit);
  const [editedPrice, setEditedPrice] = useState(item.price);

  const handleUpdate = () => {
    onUpdate(item.id, {
      ...item,
      name: editedName,
      quantity: editedQuantity,
      unit: editedUnit,
      price: editedPrice,
    });
    setIsEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`list-group-item d-flex align-items-center ${item.purchased ? 'bg-light' : ''}`}
    >
      <button {...listeners} className="btn btn-link me-2 p-0" style={{ cursor: 'grab' }}>
        <i className="bi bi-grip-vertical"></i>
      </button>
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={item.purchased}
        onChange={() => onTogglePurchased(item.id)}
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
            type="number"
            className="form-control me-2"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(parseInt(e.target.value, 10))}
            min="1"
          />
          <input
            type="text"
            className="form-control me-2"
            value={editedUnit}
            onChange={(e) => setEditedUnit(e.target.value.replace(/[0-9]/g, ''))}
          />
          <input
            type="number"
            className="form-control me-2"
            value={editedPrice}
            onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
            min="0"
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
            <div className={`flex-grow-1 fw-bold ${item.purchased ? 'text-decoration-line-through' : ''}`}>
                {item.name}
            </div>
            <div className={`mx-3 text-muted ${item.purchased ? 'text-decoration-line-through' : ''}`}>
                {item.quantity} {item.unit}
            </div>
            <div className={`mx-3 ${item.purchased ? 'text-decoration-line-through' : ''}`}>
                ${item.price.toFixed(2)}
            </div>
            <div className={`fw-bold mx-4 ${item.purchased ? 'text-decoration-line-through' : ''}`}>
                ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
                className={`btn btn-sm me-2 ${item.purchased ? 'btn-success' : 'btn-warning'}`}
                onClick={() => onTogglePurchased(item.id)}
            >
                {item.purchased ? 'Completed' : 'Pending'}
            </button>
            <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
      )}
    </li>
  );
};
