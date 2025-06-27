import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableExpenseItem } from '../SortableExpenseItem';

interface Item {
  id: number;
  name: string;
  amount: number;
  category: string;
  paid: boolean;
}

const ExpenseList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState(0);
  const [itemCategory, setItemCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('expense-list-items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    if (isSaved) {
      setIsSaved(false);
    }
  }, [items]);

  const handleSave = () => {
    localStorage.setItem('expense-list-items', JSON.stringify(items));
    setIsSaved(true);
  };

  const handleClear = () => {
    setItems([]);
    localStorage.setItem('expense-list-items', JSON.stringify([]));
    setIsSaved(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addItem = () => {
    if (itemName.trim() !== '') {
      setItems([...items, { id: Date.now(), name: itemName, amount: itemAmount, category: itemCategory, paid: false }]);
      setItemName('');
      setItemAmount(0);
      setItemCategory('');
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, updatedItem: Item) => {
    setItems(items.map(item => (item.id === id ? updatedItem : item)));
  };

  const togglePaid = (id: number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const totalAmount = items.reduce((total, item) => total + item.amount, 0);
  const paidItems = items.filter(item => item.paid).length;
  const pendingItems = items.length - paidItems;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="card-title mb-0">Expense List</h1>
                <div>
                  <button className={`btn ${isSaved ? 'btn-success' : 'btn-primary'} me-2`} onClick={handleSave}>
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button className="btn btn-danger me-2" onClick={handleClear}>Clear</button>
                  <input
                    type="date"
                    className="form-control w-auto d-inline-block"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter expense name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    value={itemAmount}
                    onChange={(e) => setItemAmount(parseFloat(e.target.value))}
                    min="0"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value.replace(/[0-9]/g, ''))}
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
                </div>
                <div className="col-md-2 d-grid">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={addItem}
                  >
                    <i className="bi bi-plus"></i> Add
                  </button>
                </div>
              </div>
              <hr />
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={items.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="list-group">
                    {items.map(item => (
                      <SortableExpenseItem
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdate={updateItem}
                        onTogglePaid={togglePaid}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <span>Pending: {pendingItems}</span>
              <span>Paid: {paidItems}</span>
              <span>Total Amount: ${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;