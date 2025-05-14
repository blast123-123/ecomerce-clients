export interface GetAllProducts {
  message: string
  status: number
  count: number
  data: {
    id: string
    name: string
    description: string
    price: number
    type_camera: string
    createdAt: string
    updatedAt: string
    quantity_buy: number
    ProductsImgs: {
      id: string
      key_url_unique: string
      url: string
    }[]
  }[]
}

export type Product = {
  data: {
    id: string
    name: string
    description: string
    price: number
    type_camera: string
    createdAt: string
    updatedAt: string
    quantity_buy: number
    ProductsImgs: {
      id: string
      key_url_unique: string
      url: string
    }[]
  }
}

export type ProductCart = {
  id: string
  name: string
  description: string
  price: number
  type_camera: string
  createdAt: string
  updatedAt: string
  quantity_buy: number
  ProductsImgs: {
    id: string
    key_url_unique: string
    url: string
  }[]
}
