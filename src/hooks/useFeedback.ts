import { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { getFeedbackByStudent } from '../services/feedbackService';

interface UseFeedbackReturn {
  feedback: Feedback | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFeedback(email: string | undefined): UseFeedbackReturn {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getFeedbackByStudent(email);
        if (!cancelled) setFeedback(data);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load feedback');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [email, trigger]);

  return { feedback, isLoading, error, refetch: () => setTrigger((t) => t + 1) };
}
