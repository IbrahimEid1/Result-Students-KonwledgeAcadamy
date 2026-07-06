import apiClient from './apiClient';
import { MOCK_USER } from '../lib/mockData';
import { LoginCredentials, User } from '../types';

// Toggle to false when Strapi backend is ready
const USE_MOCK = true;

export async function login(credentials: LoginCredentials): Promise<{ jwt: string; user: User }> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 900));
    if (
      credentials.email === 'ahmed.hassan@student.edu' &&
      credentials.password === 'demo1234'
    ) {
      return { jwt: 'mock_jwt_token_abc123', user: MOCK_USER };
    }
    throw new Error('Invalid email or password');
  }

  const response = await apiClient.post('/auth/local', {
    identifier: credentials.email,
    password: credentials.password,
  });
  return response.data;
}

export async function getCurrentStudent(): Promise<User> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_USER;
  }
  const response = await apiClient.get('/users/me?populate=*');
  return response.data;
}
