import axios from 'axios'
import { GetAllProducts, Product } from '../types/types'
const url = 'http://localhost:4000/api-v1'
export const getAllProducts = async (page: number = 1, size: number = 10) => {
  const { data } = await axios.get<GetAllProducts>(
    `${url}/product?page=${page}&size=${size}`
  )
  return data
}

export const getOneProduct = async (id: string | undefined) => {
  const { data } = await axios.get<Product>(`${url}/product/${id}`)
  return data.data
}
