import type { AuthReq, AuthRes } from '../types/auth'


const API_BASE_URL = 'http://localhost:3000/api/v1/auth'
// const API_BASE_URL = 'https://tech-shop-api-pxu4.onrender.com/api/v1/auth'

export const login = async (data: AuthReq): Promise<AuthRes> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  return response.json()
}

export const validateToken = async (): Promise<{ user: AuthRes['user'] }> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Invalid token');
  }

  return response.json();
};
