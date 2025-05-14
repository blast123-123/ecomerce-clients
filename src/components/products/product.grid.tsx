'use client'

import { useGetAllProducts } from '@/app/products/services/queries.service'
import { ProductCart } from '@/app/products/types/types'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useCartStore } from '@/stores/useCartStore'
import { Grid, List, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import ProductCard from './product.card'
import SkeletonCard from './skeleton.card'

const ITEMS_PER_PAGE = 6

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const { addItem } = useCartStore()
  const searchParams = useSearchParams()
  const router = useRouter()

  const maxPrice = 10000
  const initialSearch = searchParams.get('search') || ''
  const initialPrice = parseInt(searchParams.get('price') || '0')

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [priceRange, setPriceRange] = useState([initialPrice])

  const handlePriceChange = (value: number[]) => setPriceRange(value)

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (priceRange[0] > 0) params.set('price', priceRange[0].toString())
    router.replace(`?${params.toString()}`)
    setPage(1)
  }

  useEffect(() => {
    setSearchTerm(initialSearch)
    setPriceRange([initialPrice])
  }, [initialSearch, initialPrice])

  const { data = { data: [], count: 0 }, isLoading: isLoadingProducts } =
    useGetAllProducts(1, 1000)
  const filteredData = data.data.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesPrice = product.price >= priceRange[0]
    return matchesSearch && matchesPrice
  })

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const handleAddToCart = (itemToProduct: ProductCart, quantity: number) => {
    addItem({
      ...itemToProduct,
      quantity_buy: quantity,
    })
    toast.success('Agregado al carrito', {
      duration: 2000,
      id: 'added-to-cart',
    })
  }

  return (
    <>
      <div className="w-full md:w-1/4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Buscar</h3>
            <div className="flex">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="rounded-r-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="rounded-l-none"
                onClick={handleFilter}
                disabled
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-1 h-4 bg-slate-50 mr-2"></div>
              <h3 className="text-lg font-medium">Filtrar Por Precio</h3>
            </div>

            <Slider
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                PRECIO: S/{priceRange[0]} — S/{maxPrice}
              </span>
              <Button
                variant="destructive"
                size="sm"
                className="uppercase text-xs"
                onClick={handleFilter}
                disabled
              >
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              VISUALIZACIÓN:{' '}
              <span className="font-medium">{paginatedData.length}</span>/
              {ITEMS_PER_PAGE}/{filteredData.length}
            </div>
          </div>

          <div
            className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            } gap-6 items-stretch`}
          >
            {isLoadingProducts
              ? [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                  <SkeletonCard key={i} viewMode={viewMode} />
                ))
              : paginatedData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    handledAddToCart={handleAddToCart}
                  />
                ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-gray-600 px-3">
                    Página {page} de {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    aria-disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  )
}
