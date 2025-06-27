
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Item {
  id: number;
  name: string;
  amount: number;
  category: string;
  paid: boolean;
}

interface SortableExpenseItemProps {
  item: Item;
  onRemove: (id: number) => void;
  onUpdate: (id: number, updatedItem: Item) => void;
  onTogglePaid: (id: number) => void;
}

export const SortableExpenseItem: React.FC<SortableExpenseItemProps> = ({
  item,
  onRemove,
  onUpdate,
  onTogglePaid,
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
  const [editedAmount, setEditedAmount] = useState(item.amount);
  const [editedCategory, setEditedCategory] = useState(item.category);

  const handleUpdate = () => {
    onUpdate(item.id, {
      ...item,
      name: editedName,
      amount: editedAmount,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`list-group-item d-flex align-items-center ${item.paid ? 'bg-light' : ''}`}
    >
      <button {...listeners} className="btn btn-link me-2 p-0" style={{ cursor: 'grab' }}>
        <i className="bi bi-grip-vertical"></i>
      </button>
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={item.paid}
        onChange={() => onTogglePaid(item.id)}
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
            value={editedAmount}
            onChange={(e) => setEditedAmount(parseFloat(e.target.value))}
            min="0"
          />
          <input
            type="text"
            className="form-control me-2"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value.replace(/[0-9]/g, ''))}
            list="expense-categories"
          />
          <datalist id="expense-categories">
            <option value="Housing" />
            <option value="Rent" />
            <option value="Mortgage" />
            <option value="Utilities" />
            <option value="Electricity" />
            <option value="Water" />
            <option value="Gas" />
            <option value="Internet" />
            <option value="Phone" />
            <option value="Food" />
            <option value="Groceries" />
            <option value="Restaurants" />
            <option value="Transportation" />
            <option value="Gasoline" />
            <option value="Public Transit" />
            <option value="Car Maintenance" />
            <option value="Insurance" />
            <option value="Health Insurance" />
            <option value="Car Insurance" />
            <option value="Home Insurance" />
            <option value="Debt Payments" />
            <option value="Student Loans" />
            <option value="Credit Card" />
            <option value="Personal Loans" />
            <option value="Entertainment" />
            <option value="Movies" />
            <option value="Concerts" />
            <option value="Subscriptions" />
            <option value="Gym" />
            <option value="Personal Care" />
            <option value="Toiletries" />
            <option value="Haircuts" />
            <option value="Clothing" />
            <option value="Technology" />
            <option value="Gifts" />
            <option value="Donations" />
            <option value="Travel" />
            <option value="Flights" />
            <option value="Hotels" />
            <option value="Childcare" />
            <option value="Pet Care" />
            <option value="Savings" />
            <option value="Investments" />
            <option value="Taxes" />
            <option value="Education" />
            <option value="Books" />
            <option value="Tuition" />
            <option value="Petrol Exp" />
            <option value="Chai" />
            <option value="Coffee" />
            <option value="Miscellaneous" />
            <option value="Other" />
          </datalist>
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            <i className="bi bi-check"></i>
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      ) : (
        <div className="d-flex flex-grow-1 align-items-center">
            <div className={`flex-grow-1 fw-bold ${item.paid ? 'text-decoration-line-through' : ''}`}>
                {item.name}
            </div>
            <div className={`mx-3 text-muted ${item.paid ? 'text-decoration-line-through' : ''}`}>
                {item.category}
            </div>
            <div className={`fw-bold mx-4 ${item.paid ? 'text-decoration-line-through' : ''}`}>
                ${item.amount.toFixed(2)}
            </div>
            <button
                className={`btn btn-sm me-2 ${item.paid ? 'btn-success' : 'btn-warning'}`}
                onClick={() => onTogglePaid(item.id)}
            >
                {item.paid ? 'Paid' : 'Pending'}
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
