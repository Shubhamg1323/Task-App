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
import { SortableShoppingItem } from '../SortableShoppingItem';

interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  purchased: boolean;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemUnit, setItemUnit] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('shopping-list-items');
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
    localStorage.setItem('shopping-list-items', JSON.stringify(items));
    setIsSaved(true);
  };

  const handleClear = () => {
    setItems([]);
    localStorage.setItem('shopping-list-items', JSON.stringify([]));
    setIsSaved(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Quantity', 'Unit', 'Price', 'Purchased'],
      ...items.map(item => [
        item.id,
        item.name,
        item.quantity,
        item.unit,
        item.price,
        item.purchased,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'shopping-list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addItem = () => {
    if (itemName.trim() !== '') {
      setItems([...items, { id: Date.now(), name: itemName, quantity: itemQuantity, unit: itemUnit, price: itemPrice, purchased: false }]);
      setItemName('');
      setItemQuantity(1);
      setItemUnit('');
      setItemPrice(0);
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, updatedItem: Item) => {
    setItems(items.map(item => (item.id === id ? updatedItem : item)));
  };

  const togglePurchased = (id: number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
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

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const completedItems = items.filter(item => item.purchased).length;
  const pendingItems = items.length - completedItems;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="card-title mb-0">Shopping List</h1>
                <div>
                  <button className="btn btn-info me-2" onClick={handleExport}>Export</button>
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
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Qty"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(parseInt(e.target.value, 10))}
                    min="1"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Unit"
                    value={itemUnit}
                    onChange={(e) => setItemUnit(e.target.value.replace(/[0-9]/g, ''))}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    min="0"
                  />
                </div>
                <div className="col-md-1 d-grid">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={addItem}
                  >
                    <i className="bi bi-plus"></i>
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
                      <SortableShoppingItem
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdate={updateItem}
                        onTogglePurchased={togglePurchased}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <span>Pending: {pendingItems}</span>
              <span>Completed: {completedItems}</span>
              <span>Total Price: ${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;