import { Cart } from '../types/cart'

const API_BASE_URL = 'http://localhost:3000/api/v1/cart'

interface Res {
  cart: Cart
}

export const fetchCart = async (): Promise<Res> => {
  const token = localStorage.getItem('token')

  const response = await fetch(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }

  return response.json()
}

interface AddToCart {
  quantity: number
  color: {
    name: string
    code: string
  }
}

export const addToCart = async (
  productId: number,
  color_name: string,
  color_code: string,
  quantity: number
): Promise<any> => {
  const token = localStorage.getItem('token')

  const requestBody: AddToCart = {
    quantity: quantity,
    color: {
      name: color_name,
      code: color_code
    }
  };

  const response = await fetch(`${API_BASE_URL}/add_item/${productId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    throw new Error('Failed to add product to cart')
  }

  return response.json()
}

export const updateCart = async (
  productId: number,
  color_name: string,
  color_code: string,
  quantity: number
): Promise<any> => {
  const token = localStorage.getItem('token')

  const requestBody: AddToCart = {
    quantity: quantity,
    color: {
      name: color_name,
      code: color_code
    }
  };

  const response = await fetch(`${API_BASE_URL}/add_item/${productId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    throw new Error('Failed to add product to cart')
  }

  return response.json()
}
