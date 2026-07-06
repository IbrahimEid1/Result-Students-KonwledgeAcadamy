import React, { useEffect, useState } from 'react';
import { getPerformanceLevel, getPerformanceColor, getPerformanceBadgeClass } from '../utils/helpers';

interface ScoreCircleProps {
  score: number;
  size?: number;
}

export function ScoreCircle({ score, size = 160 }: ScoreCircleProps) {
  const [animated, setAnimated] = useState(false);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const level = getPerformanceLevel(score);
  const color = getPerformanceColor(score);
  const badgeClass = getPerformanceBadgeClass(score);
  const offset = animated ? circumference - (score / 100) * circumference : circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: color }}
        />
        <svg
          width={size}
          height={size}
          className="progress-ring relative z-10"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="progress-ring__circle drop-shadow-sm"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span
            className="text-4xl font-display font-bold leading-none"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-body mt-1">out of 100</span>
        </div>
      </div>

      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
        {level}
      </span>
    </div>
  );
}
