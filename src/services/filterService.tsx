const API_BASE_URL = 'http://localhost:3000/api/v1/filter'

export const fetchAllFilter = async (): Promise<any> => {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export const fetchFilterByCategory = async (category_id: number): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}?category_id=${category_id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}
