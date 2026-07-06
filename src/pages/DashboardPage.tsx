import React from 'react';
import {
  Star, AlertTriangle, Code2, MessageSquare,
  BookOpen, StickyNote, RefreshCw, Trophy,
  Folder, Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../hooks/useFeedback';
import { ScoreCircle } from '../components/ScoreCircle';
import { AccordionItem } from '../components/AccordionItem';
import { DashboardSkeleton } from '../components/Skeleton';
import { formatDate, getPerformanceBadgeClass, getPerformanceLevel } from '../utils/helpers';
import toast from 'react-hot-toast';

export function DashboardPage() {
  const { user } = useAuth();
  const { feedback, isLoading, error, refetch } = useFeedback(user?.email);

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Feedback Unavailable</h2>
        <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-sm">{error}</p>
        <button
          onClick={() => { refetch(); toast.loading('Retrying…', { duration: 1000 }); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <StickyNote size={24} className="text-[var(--text-secondary)]" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No Feedback Yet</h2>
        <p className="text-[var(--text-secondary)] text-sm max-w-sm">
          Your instructor hasn't submitted your evaluation yet. Check back later.
        </p>
      </div>
    );
  }

  const level = getPerformanceLevel(feedback.score);
  const badgeClass = getPerformanceBadgeClass(feedback.score);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Hero Section ── */}
      <div className="card p-6 sm:p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-100/60 to-transparent dark:from-brand-900/20 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeClass}`}>
                {level}
              </span>
              <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(feedback.evaluationDate)}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
              Your evaluation for <strong className="text-[var(--text-primary)]">{feedback.projectName}</strong> is ready. Review your performance below.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Folder size={13} />
                <span>{feedback.projectName}</span>
              </div>
              <span className="text-[var(--border)]">·</span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Trophy size={13} />
                <span>{feedback.score}/100 overall score</span>
              </div>
            </div>
          </div>
          <ScoreCircle score={feedback.score} />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[var(--border)]">
          {[
            { label: 'Strengths', value: feedback.strengths.length, color: 'text-emerald-500' },
            { label: 'Code Issues', value: feedback.codingIssues.length, color: 'text-orange-500' },
            { label: 'Interview Q\'s', value: feedback.interviewMistakes.length, color: 'text-red-500' },
            { label: 'Topics to Study', value: feedback.recommendedTopics.length, color: 'text-brand-500' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Overall Evaluation */}
        <div className="card p-6 card-hover lg:col-span-2">
          <SectionHeader icon={<MessageSquare size={17} />} title="Project Evaluation" color="brand" />
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-3">
            {feedback.overallEvaluation}
          </p>
        </div>

        {/* Strengths */}
        <div className="card p-6 card-hover">
          <SectionHeader icon={<Star size={17} />} title="Strength Points" color="emerald" />
          <ul className="mt-3 space-y-2">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-[var(--text-secondary)] leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Code Issues */}
        <div className="card p-6 card-hover">
          <SectionHeader icon={<Code2 size={17} />} title="Code Issues Found" color="orange" />
          <ul className="mt-3 space-y-2">
            {feedback.codingIssues.map((issue, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-[var(--text-secondary)] leading-relaxed">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Interview Questions ── */}
      <div>
        <SectionHeader
          icon={<MessageSquare size={17} />}
          title={`Interview Questions Missed (${feedback.interviewMistakes.length})`}
          color="red"
          className="mb-4"
        />
        <div className="space-y-3">
          {feedback.interviewMistakes.map((q, i) => (
            <AccordionItem key={i} question={q} index={i} />
          ))}
        </div>
      </div>

      {/* ── Recommended Topics ── */}
      <div className="card p-6">
        <SectionHeader icon={<BookOpen size={17} />} title="Recommended Learning Path" color="brand" />
        <div className="mt-4 flex flex-wrap gap-2">
          {feedback.recommendedTopics.map((topic, i) => (
            <span
              key={i}
              className="px-3.5 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-sm font-medium border border-brand-100 dark:border-brand-900/40 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors cursor-default"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* ── Final Notes ── */}
      <div className="card p-6 bg-gradient-to-br from-slate-50 to-brand-50/40 dark:from-slate-900/50 dark:to-brand-900/10">
        <SectionHeader icon={<StickyNote size={17} />} title="Final Notes from Instructor" color="slate" />
        <blockquote className="mt-3 pl-4 border-l-2 border-brand-300 dark:border-brand-700">
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
            "{feedback.finalNotes}"
          </p>
        </blockquote>
      </div>

    </div>
  );
}

// Helper sub-component
type ColorKey = 'brand' | 'emerald' | 'orange' | 'red' | 'slate';

const colorMap: Record<ColorKey, string> = {
  brand: 'bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

function SectionHeader({
  icon,
  title,
  color,
  className = '',
}: {
  icon: React.ReactNode;
  title: string;
  color: ColorKey;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        {icon}
      </span>
      <h2 className="font-display font-semibold text-base text-[var(--text-primary)]">{title}</h2>
    </div>
  );
}
