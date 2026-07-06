import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="text-center animate-slide-up">
        <div className="relative inline-block mb-8">
          <span className="font-display text-[10rem] font-bold text-slate-100 dark:text-slate-800 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shadow-lg">
              <Compass size={36} className="text-brand-600 dark:text-brand-400" />
            </div>
          </div>
        </div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
