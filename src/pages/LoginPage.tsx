import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, GraduationCap, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { DEMO_CREDENTIALS } from '../lib/mockData';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const { isDark, toggle } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      await login(data);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  const fillDemo = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo / Branding */}
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 items-center justify-center shadow-glow mb-5">
              <GraduationCap size={30} className="text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">
              Student Portal
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Sign in to view your project evaluation & feedback
            </p>
          </div>

          {/* Card */}
          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Global error */}
              {apiError && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 animate-scale-in">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className={`
                    w-full px-4 py-3 rounded-xl border bg-[var(--bg)] text-[var(--text-primary)]
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                    transition-all duration-200 text-sm
                    ${errors.email ? 'border-red-400 focus:ring-red-400/30' : 'border-[var(--border)]'}
                  `}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                    className={`
                      w-full px-4 py-3 pr-11 rounded-xl border bg-[var(--bg)] text-[var(--text-primary)]
                      placeholder:text-slate-400 dark:placeholder:text-slate-500
                      focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                      transition-all duration-200 text-sm
                      ${errors.password ? 'border-red-400 focus:ring-red-400/30' : 'border-[var(--border)]'}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-medium text-sm shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-center text-[var(--text-secondary)] mb-3">
                Demo credentials for testing
              </p>
              <button
                onClick={fillDemo}
                className="w-full p-3 rounded-xl border border-dashed border-brand-300 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/10 hover:bg-brand-100 dark:hover:bg-brand-900/20 transition-colors text-xs text-brand-600 dark:text-brand-400 font-mono"
              >
                {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-[var(--text-secondary)] mt-6">
            Having trouble? Contact your instructor for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
