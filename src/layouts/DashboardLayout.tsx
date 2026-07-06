import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
