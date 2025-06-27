import React, { useState } from 'react';
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
import { SortableEventItem } from '../SortableEventItem';

interface Event {
  id: number;
  name: string;
  date: string;
  completed: boolean;
}

const MonthlyPlanningList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addEvent = () => {
    if (eventName.trim() !== '') {
      setEvents([...events, { id: Date.now(), name: eventName, date: eventDate, completed: false }]);
      setEventName('');
    }
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const updateEvent = (id: number, updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === id ? updatedEvent : event)));
  };

  const toggleCompleted = (id: number) => {
    setEvents(
      events.map(event =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setEvents(events => {
        const oldIndex = events.findIndex(event => event.id === active.id);
        const newIndex = events.findIndex(event => event.id === over.id);
        return arrayMove(events, oldIndex, newIndex);
      });
    }
  };

  const completedEvents = events.filter(event => event.completed).length;
  const pendingEvents = events.length - completedEvents;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Monthly Planning</h1>
              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div className="col-md-2 d-grid">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={addEvent}
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
                  items={events.map(event => event.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="list-group">
                    {events.map(event => (
                      <SortableEventItem
                        key={event.id}
                        event={event}
                        onRemove={removeEvent}
                        onUpdate={updateEvent}
                        onToggleCompleted={toggleCompleted}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <span>Pending: {pendingEvents}</span>
              <span>Completed: {completedEvents}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPlanningList;