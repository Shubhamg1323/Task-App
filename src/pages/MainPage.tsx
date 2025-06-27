import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center">
            <div className="card-header">
              <h1>Welcome to Your Personal Organizer</h1>
            </div>
            <div className="card-body">
              <p className="card-text">Please select one of the options below to get started.</p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <Link to="/todo" className="btn btn-primary btn-lg">
                  <i className="bi bi-card-checklist me-2"></i>
                  To-Do List
                </Link>
                <Link to="/shopping" className="btn btn-success btn-lg">
                  <i className="bi bi-cart-check me-2"></i>
                  Shopping List
                </Link>
                <Link to="/expense" className="btn btn-info btn-lg">
                  <i className="bi bi-credit-card me-2"></i>
                  Expense List
                </Link>
                <Link to="/planning" className="btn btn-warning btn-lg">
                  <i className="bi bi-calendar-event me-2"></i>
                  Monthly Planning
                </Link>
                <Link to="/gym" className="btn btn-danger btn-lg">
                  <i className="bi bi-activity me-2"></i>
                  Gym Workout List
                </Link>
              </div>
            </div>
            <div className="card-footer text-muted">
              Stay organized, stay productive!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;