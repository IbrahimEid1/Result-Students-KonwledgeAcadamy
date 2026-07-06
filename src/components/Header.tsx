import React from 'react';
import { LogOut, Moon, Sun, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-sm">
            <GraduationCap size={16} className="text-white" />
          </div>
          <div>
            <span className="font-display font-semibold text-[var(--text-primary)] text-sm hidden sm:block">
              EvalPortal
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User info */}
          {user && (
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-[var(--border)]">
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--text-primary)] leading-none">{user.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{user.email}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
            aria-label="Logout"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
