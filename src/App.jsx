import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwriter/Auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100">
    <Header />
    <main className="flex-1 w-full">
      <Outlet />
    </main>
    <Footer />
  </div>
)}

export default App
