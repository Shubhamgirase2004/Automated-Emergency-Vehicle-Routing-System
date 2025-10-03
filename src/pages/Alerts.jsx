import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const mockAlerts = [
  { id: 1, message: "Fire incident near Downtown", type: "Fire", time: "2025-10-03 14:22", status: "Active" },
  { id: 2, message: "Road Blocked at 5th Avenue", type: "Traffic", time: "2025-10-03 12:10", status: "Active" },
];

export default function Alerts() {
  const [search, setSearch] = useState('');
  const filtered = mockAlerts.filter(
    a => a.message.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2 mb-6">
          <HiOutlineExclamationCircle className="h-8 w-8 text-red-500" /> Active Alerts
        </h2>
        <input
          className="w-full p-2 mb-5 border border-gray-300 rounded focus:outline-none focus:border-red-400 transition"
          type="text"
          placeholder="Filter by message or type…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-2">Type</th>
                <th className="py-2 px-2">Time</th>
                <th className="py-2 px-2">Message</th>
                <th className="py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(alert => (
                <tr key={alert.id} className="hover:bg-red-50 transition">
                  <td className="py-2 px-2">{alert.type}</td>
                  <td className="py-2 px-2">{alert.time}</td>
                  <td className="py-2 px-2">{alert.message}</td>
                  <td className="py-2 px-2">
                    <span className={"px-2 py-1 rounded text-xs font-semibold " + (
                      alert.status === "Active" ? "bg-red-200 text-red-900" : "bg-gray-200 text-gray-800"
                    )}>{alert.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 &&
                <tr><td colSpan={4} className="py-6 text-center text-gray-400">No active alerts found.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
