import type { GetAllProducts } from '@/app/products/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ShoppingCartIcon } from 'lucide-react'

interface ProductCardProps {
  product: GetAllProducts['data'][number]
  viewMode: 'grid' | 'list'
  handledAddToCart: (
    product: GetAllProducts['data'][number],
    quantity: number
  ) => void
}

export default function ProductCard({
  product,
  viewMode,
  handledAddToCart,
}: ProductCardProps) {
  return (
    <div
      className={`group relative flex ${
        viewMode === 'list' ? 'flex-row' : 'flex-col'
      } h-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-md`}
    >
      {/* Image container */}
      <div
        className={`relative ${
          viewMode === 'list' ? 'w-1/3 min-w-[120px]' : 'aspect-square w-full'
        } bg-gray-50`}
      >
        <Image
          src={
            product.ProductsImgs[0]?.url ||
            '/placeholder.svg?height=300&width=300'
          }
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content container */}
      <div
        className={`flex flex-1 flex-col justify-between p-4 ${
          viewMode === 'list' ? 'w-2/3' : 'w-full'
        }`}
      >
        {/* Product info */}
        <div className="space-y-3 ">
          {/* Product name */}
          <div>
            <Badge
              variant="default"
              className="mb-1 text-xl text-white  font-bold max-w-[300px] line-clamp-1 truncate whitespace-nowrap"
            >
              {product.name}
            </Badge>
            <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
              {product.type_camera}
            </h3>
          </div>

          {/* Description */}
          {(viewMode === 'list' || product.description) && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-gray-700">Descripción</h4>
              <p className="line-clamp-2 text-xs text-gray-600">
                {product.description || 'Sin descripción disponible'}
              </p>
            </div>
          )}
        </div>

        {/* Price and action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            S/{Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <Link href={`/products/${product.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 text-xs font-medium transition-colors hover:bg-gray-900 hover:text-white"
              >
                Detalles
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
            <Button onClick={() => handledAddToCart(product, 1)} size={'icon'}>
              <ShoppingCartIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
