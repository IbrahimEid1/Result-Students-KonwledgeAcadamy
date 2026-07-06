import apiClient from './apiClient';
import { MOCK_FEEDBACK } from '../lib/mockData';
import { Feedback } from '../types';

const USE_MOCK = true;

export async function getFeedbackByStudent(studentEmail: string): Promise<Feedback> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1200));
    if (studentEmail !== MOCK_FEEDBACK.studentEmail) {
      throw new Error('No feedback found for this student');
    }
    return MOCK_FEEDBACK;
  }

  const response = await apiClient.get(
    `/feedbacks?filters[studentEmail][$eq]=${encodeURIComponent(studentEmail)}&populate=*`
  );
  const items = response.data?.data;
  if (!items || items.length === 0) {
    throw new Error('No feedback found for this student');
  }
  return items[0].attributes as Feedback;
}

export async function getFeedbackById(id: number): Promise<Feedback> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return MOCK_FEEDBACK;
  }
  const response = await apiClient.get(`/feedbacks/${id}?populate=*`);
  return response.data?.data?.attributes as Feedback;
}
