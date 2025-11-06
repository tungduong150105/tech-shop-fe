import type { Categories } from '../types/category';

const API_BASE_URL = 'http://localhost:3000/api/v1/categories';

export const fetchCategories = async (): Promise<Categories> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}
