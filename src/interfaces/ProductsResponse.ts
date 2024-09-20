import type { Product } from './Product'

export interface ProductsResponse {
  products: Product[]
  isLoading: boolean
  hasError: boolean
}
