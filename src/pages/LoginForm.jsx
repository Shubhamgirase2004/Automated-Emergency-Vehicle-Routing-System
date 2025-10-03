import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      toast.success('Login successful!');
      navigate('/dispatcher');
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 mt-12 mb-4 mx-auto shadow-lg max-w-sm w-full rounded-lg bg-white space-y-3"
    >
      <h1 className="font-bold text-2xl text-center mb-2">LOGIN NOW</h1>
      <input
        type="email"
        placeholder="enter your email"
        className="w-full p-3 bg-gray-100 rounded mb-2"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="enter your password"
        className="w-full p-3 bg-gray-100 rounded mb-3"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button
        type="submit"
        className="w-full p-3 bg-pink-200 rounded font-bold text-lg"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login Now'}
      </button>
      <div className="text-center mt-2">
        <span>don't have an account? </span>
        <button
          type="button"
          className="underline text-pink-600"
          onClick={() => navigate('/register')}
        >
          register now
        </button>
      </div>
    </form>
  );
}
