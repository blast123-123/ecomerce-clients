'use client'

import { ArrowLeft, MinusIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { useGetOneProduct } from '@/app/products/services/queries.service'
import { Product } from '@/app/products/types/types'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/useCartStore'
import Link from 'next/link'
import { toast } from 'sonner'
import SkeletonDetails from './skeleton-details'

const DetailsOneProduct = ({ id }: { id: string | undefined }) => {
  const { data: product, isLoading } = useGetOneProduct(id)

  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.ProductsImgs[0]?.url
  )
  if (isLoading) return <SkeletonDetails />
  if (!product) return <SkeletonDetails />

  const handleAddToCart = (itemToProduct: Product['data']) => {
    if (itemToProduct && itemToProduct.id) {
      toast.success('Agregado al carrito', {
        duration: 2000,
        id: 'added-to-cart',
      })

      addItem({
        ...itemToProduct,
        quantity_buy: quantity,
      })
    }
  }

  return (
    <>
      <div className="container mt-20 mx-auto px-4 py-8">
        <div className="mb-6 flex justify-end">
          <Link href="/" className="w-[300px]">
            <Button className="w-full" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="space-y-4 mr-auto">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md">
              <Image
                src={
                  selectedImage ||
                  product?.ProductsImgs[0]?.url ||
                  '/placeholder.svg'
                }
                alt={product?.name ?? 'Product Image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                {product?.ProductsImgs.map((variant) => (
                  <CarouselItem key={variant.id} className="basis-1/5">
                    <div
                      className={cn(
                        'relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 ring-offset-2 transition-all hover:opacity-80',
                        selectedImage === variant.url && 'ring-2 ring-primary'
                      )}
                      onClick={() => setSelectedImage(variant.url)}
                    >
                      <Image
                        src={variant.url}
                        alt={`${product.name} - ${variant.id}`}
                        priority
                        width={300}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">
                Producto: {product.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Description: {product.description}
              </p>
              <p className="mt-2 text-muted-foreground">
                Tipo de cámara: {product.type_camera}
              </p>
              <p className="mt-2 text-muted-foreground">
                Precio: ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={() => handleAddToCart(product)}
              className="w-[300px] py-6 h-[50px] font-semibold"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsOneProduct
