import React from "react";

const users = [
  { id: 1, name: "Alice", email: "alice@email.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@email.com", role: "User" },
];

function ManageAccounts() {
  return (
    <>
      <style>{`
        .accounts-section { margin: 40px; padding: 32px; border-radius: 16px; background: #f1f7fe; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .accounts-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .accounts-table th, .accounts-table td { border: 1px solid #d8e6fc; padding: 10px 14px; }
        .accounts-table th { background: #e2eefd; color: #223e7c; font-weight: 600; }
      `}</style>
      <div className="accounts-section">
        <h2>Manage Accounts</h2>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ManageAccounts;
