import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PerformanceLevel } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPerformanceLevel(score: number): PerformanceLevel {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}

export function getPerformanceColor(score: number): string {
  if (score >= 90) return '#10b981'; // emerald
  if (score >= 80) return '#6272f1'; // brand
  if (score >= 70) return '#f59e0b'; // amber
  if (score >= 60) return '#f97316'; // orange
  return '#ef4444'; // red
}

export function getPerformanceBadgeClass(score: number): string {
  if (score >= 90) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
  if (score >= 80) return 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400';
  if (score >= 70) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  if (score >= 60) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
