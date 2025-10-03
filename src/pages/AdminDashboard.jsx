import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { HiOutlineUserGroup, HiOutlineExclamationCircle, HiOutlineDocumentReport, HiOutlineCog } from 'react-icons/hi';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login/admin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pb-24">
      {/* HEADER */}
      <header className="flex items-center justify-between w-full max-w-6xl px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
            <HiOutlineCog className="text-blue-700 w-8 h-8" />
          </span>
          <h1 className="text-2xl font-bold text-blue-900 tracking-tight">Admin Panel</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* WELCOME BANNER */}
      <div className="w-full max-w-6xl p-8 mt-10 bg-gradient-to-r from-blue-200 to-green-100 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin!</h2>
          <p className="text-lg text-gray-700">Monitor real-time stats, manage users and alerts, and access all admin tools below.</p>
        </div>
        <div className="flex gap-5">
          <DashboardStat
            icon={<HiOutlineUserGroup className="w-8 h-8 text-blue-600 mb-1" />}
            value="..."
            label="Users"
            link="/users"
            color="blue"
          />
          <DashboardStat
            icon={<HiOutlineExclamationCircle className="w-8 h-8 text-red-500 mb-1" />}
            value="..."
            label="Active Alerts"
            link="/alerts"
            color="red"
          />
        </div>
      </div>

      {/* ACTION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-14">
        <InteractiveCard
          icon={<HiOutlineDocumentReport className="w-9 h-9 text-green-700" />}
          title="View Reports"
          desc="Audit, filter and analyze detailed user activity, system logs and more."
          link="/reports"
          cta="Go to Reports"
          bg="from-green-100 to-white"
        />
        <InteractiveCard
          icon={<HiOutlineCog className="w-9 h-9 text-purple-700" />}
          title="Manage Accounts"
          desc="Create, update, or deactivate accounts. Control admin privileges."
          link="/accounts"
          cta="Manage Accounts"
          bg="from-purple-100 to-white"
        />
     
      </div>
    </div>
  );
}

// Dashboard stat mini-card (clickable)
function DashboardStat({ icon, value, label, link, color }) {
  return (
    <Link to={link}
      className={`bg-white rounded-lg shadow flex flex-col items-center px-8 py-4 transition hover:scale-105 group border-t-4 border-${color}-300 hover:border-${color}-500`}
    >
      {icon}
      <span className={`block text-xl font-semibold text-${color}-800 group-hover:text-${color}-600`}>{value}</span>
      <span className="text-gray-600 text-sm">{label}</span>
    </Link>
  );
}

// Main action card
function InteractiveCard({ icon, title, desc, link, cta, bg }) {
  return (
    <Link to={link} className={`group flex flex-col h-full rounded-xl shadow-md bg-gradient-to-tr ${bg} px-8 py-8 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer`}>
      <div className="mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700">{title}</h3>
      <p className="text-gray-700 mb-4">{desc}</p>
      <span className="mt-auto inline-block px-4 py-2 bg-blue-700 group-hover:bg-blue-800 text-white rounded-lg font-semibold shadow transition">{cta}</span>
    </Link>
  );
}
