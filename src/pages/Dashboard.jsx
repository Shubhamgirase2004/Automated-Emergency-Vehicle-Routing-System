import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <style>{`
        .dashboard-container { display: flex; gap: 40px; padding: 40px; }
        .card { border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); padding: 32px 24px; min-width: 340px; max-width: 400px; }
        .card-blue { background: #f1f7fe; color: #223e7c; }
        .card-green { background: #edfff8; color: #175541; }
        .card-title { margin-bottom: 16px; font-size: 2rem; font-weight: 600; }
        .card-list { list-style: none; padding-left: 0; font-size: 1.25rem; }
        .card-list li { margin-bottom: 12px; }
      `}</style>
      <div className="dashboard-container">
        <div className="card card-blue">
          <h2 className="card-title">Quick Stats</h2>
          <ul className="card-list">
            <li>Users: 37</li>
            <li>Active Alerts: 4</li>
          </ul>
        </div>
        <div className="card card-green">
          <h2 className="card-title">Actions</h2>
          <ul className="card-list">
            <li><Link to="/reports">View Reports</Link></li>
            <li><Link to="/accounts">Manage Accounts</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
