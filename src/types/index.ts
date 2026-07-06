export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface InterviewQuestion {
  question: string;
  studentWeakness: string;
  recommendedReview: string;
}

export interface Feedback {
  id: number;
  studentName: string;
  studentEmail: string;
  projectName: string;
  overallEvaluation: string;
  strengths: string[];
  codingIssues: string[];
  interviewMistakes: InterviewQuestion[];
  recommendedTopics: string[];
  finalNotes: string;
  score: number;
  evaluationDate: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type PerformanceLevel = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Needs Improvement';

export interface LoginFormData {
  email: string;
  password: string;
}
