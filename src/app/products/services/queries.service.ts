import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllProducts, getOneProduct } from './api.service'

export const useGetAllProducts = (page: number = 1, size: number = 10) =>
  useQuery({
    queryKey: ['products', page, size],
    queryFn: () => getAllProducts(page, size),
    gcTime: 3000000,
    staleTime: 3000000,
    placeholderData: keepPreviousData,
  })

export const useGetOneProduct = (id: string | undefined) =>
  useQuery({
    queryKey: ['get-one-product', id],
    queryFn: () => getOneProduct(id),
    gcTime: 5000000,
    staleTime: 5000000,
    retry: 2,
    retryDelay: 20000,
    enabled: !!id,
  })
