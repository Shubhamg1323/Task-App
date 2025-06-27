import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoList from './pages/TodoList';
import ShoppingList from './pages/ShoppingList';
import ExpenseList from './pages/ExpenseList';
import MonthlyPlanningList from './pages/MonthlyPlanningList';
import GymWorkoutList from './pages/GymWorkoutList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/expense" element={<ExpenseList />} />
        <Route path="/planning" element={<MonthlyPlanningList />} />
        <Route path="/gym" element={<GymWorkoutList />} />
      </Routes>
    </Router>
  );
}

export default App;
