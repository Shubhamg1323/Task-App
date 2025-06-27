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
import { SortableTaskItem } from '../SortableTaskItem';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  time: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (isSaved) {
      setIsSaved(false);
    }
  }, [tasks]);

  const handleSave = () => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    setIsSaved(true);
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.setItem('todo-tasks', JSON.stringify([]));
    setIsSaved(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Task', 'Time', 'Completed'],
      ...tasks.map(task => [task.id, task.text, task.time, task.completed]),
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
    link.setAttribute('download', 'todo-list.csv');
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

  const handleAddTask = () => {
    if (inputText.trim() !== '') {
      const time = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      const newTask: Task = {
        id: `task-${Date.now()}`,
        text: inputText,
        completed: false,
        time: time,
      };
      setTasks([...tasks, newTask]);
      setInputText('');
      setHour('');
      setMinute('');
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdateTask = (id: string, newText: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="card-title mb-0">To-Do List</h1>
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
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddTask()}
                  />
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="HH"
                    value={hour}
                    onChange={e => setHour(e.target.value)}
                    min="0"
                    max="23"
                    list="hours"
                  />
                  <datalist id="hours">
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')} />
                    ))}
                  </datalist>
                </div>
                <div className="col-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="MM"
                    value={minute}
                    onChange={e => setMinute(e.target.value)}
                    min="0"
                    max="59"
                    list="minutes"
                  />
                  <datalist id="minutes">
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')} />
                    ))}
                  </datalist>
                </div>
                <div className="col-2 d-grid">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddTask}
                  >
                    Add
                  </button>
                </div>
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tasks.map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="list-group">
                    {tasks.map(task => (
                      <SortableTaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTask}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
            {totalTasks > 0 && (
              <div className="card-footer text-center">
                {completedTasks === totalTasks ? (
                  <p className="mb-0">Congratulations! You did it!</p>
                ) : (
                  <p className="mb-0">
                    {completedTasks} of {totalTasks} tasks completed
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;