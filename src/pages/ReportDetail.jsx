import React from "react";
import { useParams } from "react-router-dom";

const details = {
  1: { user: "Alice", events: ["Logged in 10/1", "Edited profile 10/2"] },
  2: { user: "Bob", events: ["Placed order 10/2", "Changed password 10/3"] },
};

function ReportDetail() {
  const { id } = useParams();
  const report = details[id];

  return (
    <>
      <style>{`
        .reports-section { margin: 40px; padding: 32px; border-radius: 16px; background: #f1f7fe; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
      `}</style>
      <div className="reports-section">
        <h2>Report Detail for {report ? report.user : "Unknown"}</h2>
        {report ? (
          <ul>
            {report.events.map((ev, idx) => <li key={idx}>{ev}</li>)}
          </ul>
        ) : <p>No report found.</p>}
      </div>
    </>
  );
}
export default ReportDetail;
