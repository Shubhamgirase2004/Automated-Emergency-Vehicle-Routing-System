import React from "react";
import { Link } from "react-router-dom";

const reports = [
  { id: 1, user: "Alice", summary: "Login events, Profile edits" },
  { id: 2, user: "Bob", summary: "Order events, Password change" },
];

function Reports() {
  return (
    <>
      <style>{`
        .reports-section { margin: 40px; padding: 32px; border-radius: 16px; background: #f1f7fe; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .report-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .report-table th, .report-table td { border: 1px solid #d8e6fc; padding: 10px 14px; }
        .report-table th { background: #e2eefd; color: #223e7c; font-weight: 600; }
      `}</style>
      <div className="reports-section">
        <h2>User Reports</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Summary</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.user}</td>
                <td>{r.summary}</td>
                <td>
                  <Link to={`/reports/${r.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Reports;
