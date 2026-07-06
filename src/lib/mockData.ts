import { Feedback, User } from '../types';

export const MOCK_USER: User = {
  id: 1,
  email: 'ahmed.hassan@student.edu',
  name: 'Ahmed Hassan',
};

export const MOCK_FEEDBACK: Feedback = {
  id: 1,
  studentName: 'Ahmed Hassan',
  studentEmail: 'ahmed.hassan@student.edu',
  projectName: 'E-Commerce Platform with Next.js',
  score: 74,
  evaluationDate: '2025-06-01',
  overallEvaluation:
    'Ahmed demonstrated a solid understanding of React fundamentals and successfully delivered a working e-commerce application. The project shows strong initiative in implementing complex features like cart management and authentication flows. However, there are notable gaps in performance optimization, TypeScript usage discipline, and state management patterns that need to be addressed before moving to production-level work.',
  strengths: [
    'Strong grasp of React component lifecycle and hooks usage',
    'Clean and readable code structure with good naming conventions',
    'Implemented full authentication flow with JWT and protected routes',
    'Showed initiative in adding responsive design across all breakpoints',
    'Good understanding of REST API integration with Axios',
    'Solid version control hygiene with descriptive commits',
  ],
  codingIssues: [
    'Overuse of `any` type in TypeScript — interfaces are needed for all API responses',
    'Missing `useCallback` and `useMemo` optimizations on heavy computation components',
    'Prop drilling 4+ levels deep instead of using Context or Zustand',
    'Cart state being recalculated on every render without memoization',
    'No error boundaries implemented — app crashes on unhandled API errors',
    'Accessibility issues: missing ARIA labels, focus management, and keyboard nav',
    'Next.js Image component not used — native <img> causes LCP performance issues',
    'Missing loading states on async operations causing layout shifts',
  ],
  interviewMistakes: [
    {
      question: 'What is the difference between `useMemo` and `useCallback`?',
      studentWeakness:
        'Could not explain the practical difference. Confused memoizing a value vs memoizing a function reference.',
      recommendedReview:
        'Study React rendering optimization. Practice identifying when re-renders occur and when memoization helps.',
    },
    {
      question: 'How does Next.js handle server-side rendering vs static generation?',
      studentWeakness:
        'Explained SSR incorrectly — stated it runs on the client side. Did not know about `getStaticProps` or `getServerSideProps` differences.',
      recommendedReview:
        'Review the Next.js rendering strategies: SSR, SSG, ISR, and CSR. Build a small demo for each.',
    },
    {
      question: 'What is the purpose of `React.memo` and when should you avoid it?',
      studentWeakness:
        'Knew the basic definition but could not explain the overhead cost and when it becomes counterproductive.',
      recommendedReview:
        'Deep dive into React rendering behavior. Use React DevTools Profiler to measure performance.',
    },
    {
      question: 'Explain TypeScript generics with a real-world example.',
      studentWeakness:
        'Could write basic generics but struggled to explain why they\'re used over `any`. No practical example given.',
      recommendedReview:
        'Practice writing generic utility types: generic API response wrappers, form field types, and hook return types.',
    },
    {
      question: 'How do you prevent XSS in a React application?',
      studentWeakness:
        'Was unaware of `dangerouslySetInnerHTML` risks and did not mention content sanitization libraries.',
      recommendedReview:
        'Study web security fundamentals: XSS, CSRF, and how React\'s JSX escaping helps — and where it doesn\'t.',
    },
    {
      question: 'Describe your state management strategy and why you chose it.',
      studentWeakness:
        'Could not articulate why Context was chosen over Zustand for cart state. No justification on scalability concerns.',
      recommendedReview:
        'Compare Context API, Zustand, Redux Toolkit, and Jotai. Write a decision matrix for when to use each.',
    },
  ],
  recommendedTopics: [
    'React Performance Optimization',
    'TypeScript Generics & Advanced Types',
    'Next.js App Router & Server Components',
    'State Management (Zustand / Redux Toolkit)',
    'Web Accessibility (WCAG 2.1)',
    'Web Security Fundamentals',
    'Testing with Vitest & React Testing Library',
    'CI/CD & Production Deployment',
  ],
  finalNotes:
    'Ahmed shows genuine potential and a strong work ethic. The project complexity was ambitious and largely achieved. The main focus for the next sprint should be depth over breadth — specifically TypeScript discipline, performance optimization patterns, and security fundamentals. I recommend completing the React advanced patterns course and rebuilding the cart module using Zustand to practice proper state architecture. With focused effort over 4-6 weeks, Ahmed should be well-positioned for a junior frontend role.',
};

export const DEMO_CREDENTIALS = {
  email: 'ahmed.hassan@student.edu',
  password: 'demo1234',
};
