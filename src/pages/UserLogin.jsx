import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function UserLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('Login response:', data); // Debug output
      if (!res.ok || !data.token) throw new Error(data.message || 'Login failed');
      toast.success('Login successful!');
      login(data.token);
      navigate('/dispatcher');
    } catch (error) {
      toast.error(error.message || 'Login failed');
      console.error('Login error:', error); // Debug output
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">User Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="user@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>
        <div className="mt-6 text-center flex flex-col gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Register now
          </button>
          <button
            className="text-red-600 hover:text-red-800 font-medium transition-colors"
            onClick={() => navigate('/login/admin')}
          >
            Admin Login
          </button>
        </div>
      </div>
    </motion.div>
  );
}
