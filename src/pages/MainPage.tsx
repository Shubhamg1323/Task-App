import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-header bg-primary text-white">
              <h1>Welcome to Your Personal Organizer</h1>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">Please select one of the options below to get started.</p>
              <div className="row justify-content-center">
                <div className="col-md-12 mb-2">
                  <Link to="/todo" className="text-decoration-none">
                    <div className="card h-100 shadow-sm-hover">
                      <div className="card-body d-flex flex-row justify-content-start align-items-center p-3">
                        <i className="bi bi-card-checklist display-4 text-primary me-4"></i>
                        <h5 className="card-title mb-0">To-Do List</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-12 mb-2">
                  <Link to="/shopping" className="text-decoration-none">
                    <div className="card h-100 shadow-sm-hover">
                      <div className="card-body d-flex flex-row justify-content-start align-items-center p-3">
                        <i className="bi bi-cart-check display-4 text-success me-4"></i>
                        <h5 className="card-title mb-0">Shopping List</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-12 mb-2">
                  <Link to="/expense" className="text-decoration-none">
                    <div className="card h-100 shadow-sm-hover">
                      <div className="card-body d-flex flex-row justify-content-start align-items-center p-3">
                        <i className="bi bi-credit-card display-4 text-info me-4"></i>
                        <h5 className="card-title mb-0">Expense List</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-12 mb-2">
                  <Link to="/planning" className="text-decoration-none">
                    <div className="card h-100 shadow-sm-hover">
                      <div className="card-body d-flex flex-row justify-content-start align-items-center p-3">
                        <i className="bi bi-calendar-event display-4 text-warning me-4"></i>
                        <h5 className="card-title mb-0">Monthly Planning</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-12 mb-2">
                  <Link to="/gym" className="text-decoration-none">
                    <div className="card h-100 shadow-sm-hover">
                      <div className="card-body d-flex flex-row justify-content-start align-items-center p-3">
                        <i className="bi bi-activity display-4 text-danger me-4"></i>
                        <h5 className="card-title mb-0">Gym Workout List</h5>
                      </div>
                    </div>
                  </Link>
                </div>
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