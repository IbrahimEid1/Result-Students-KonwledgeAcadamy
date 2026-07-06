import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '../utils/helpers';
import { InterviewQuestion } from '../types';

interface AccordionItemProps {
  question: InterviewQuestion;
  index: number;
}

export function AccordionItem({ question, index }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={cn(
        'card overflow-hidden transition-all duration-200',
        isOpen && 'shadow-card-hover'
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-bold font-mono">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle size={14} className="text-[var(--text-secondary)] flex-shrink-0" />
            <span className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">Interview Question</span>
          </div>
          <p className="font-medium text-[var(--text-primary)] text-sm leading-relaxed">
            {question.question}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            'flex-shrink-0 text-[var(--text-secondary)] transition-transform duration-200 mt-0.5',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-5 pb-5 space-y-3 border-t border-[var(--border)]">
          {/* Weakness */}
          <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-orange-500" />
              <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                Student Weakness
              </span>
            </div>
            <p className="text-sm text-orange-900 dark:text-orange-200 leading-relaxed">
              {question.studentWeakness}
            </p>
          </div>
          {/* Recommended */}
          <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-brand-500" />
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                Recommended Review
              </span>
            </div>
            <p className="text-sm text-brand-900 dark:text-brand-200 leading-relaxed">
              {question.recommendedReview}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
