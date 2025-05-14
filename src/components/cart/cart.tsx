'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { configContacts } from '@/config/details'
import { useCartStore } from '@/stores/useCartStore'
import { Minus, Plus, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'

export function ShoppingCartButton() {
  const { items } = useCartStore()
  const itemCount = items.length
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity_buy,
    0
  )
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="relative text-white bg-blue-500 hover:text-primary-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="ml-2">S/{total.toFixed(2)}</span>
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>Productos agregados al carrito</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <CartItems />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function CartItems() {
  const { items, deleteItem, updateItem } = useCartStore()
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity_buy,
    0
  )

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-sm">Tu carrito está vacío</p>
      </div>
    )
  }

  const handleSendMessage = () => {
    const phone = configContacts.whatsappContact
    const lineBreak = '\n'

    const productLines = items
      .map((item, index) => {
        const name = item.name
        const quantity = item.quantity_buy
        const price = item.price
        const image = item.ProductsImgs[0]?.url || 'No disponible'
        const description = item.description
        return `${
          index + 1
        }. Producto: ${name}${lineBreak}Cantidad: ${quantity} ${lineBreak}Precio unitario: ${price.toFixed(
          2
        )}${lineBreak}Imagen: ${image}${lineBreak}Descripción: ${description}`
      })
      .join(lineBreak + lineBreak)

    const message = [
      'Hola, me gustaría hacer un pedido de los siguientes productos:',
      productLines,
      `Total a pagar: $${total.toFixed(2)}`,
    ].join(lineBreak + lineBreak)

    const encodedMessage = encodeURIComponent(message)

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="h-full flex  flex-col">
      {/* Lista de productos con scroll */}
      <div className="flex-1 overflow-y-auto  px-4 py-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl  shadow-sm p-4 flex flex-col gap-4 border"
          >
            {/* Imagen */}
            <div className="w-full h-48 relative">
              <Image
                src={item.ProductsImgs[0]?.url || '/placeholder.svg'}
                alt={item.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="rounded-md object-center object-cover"
              />
            </div>

            {/* Nombre y precio unitario */}
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Precio unitario: ${item.price.toFixed(2)}
              </p>

              <p className="text-sm text-muted-foreground">
                Cantidad: {item.quantity_buy}
              </p>
            </div>

            {/* Subtotal */}
            <div className="text-sm font-semibold text-right">
              Subtotal: ${(item.price * item.quantity_buy).toFixed(2)}
            </div>

            {/* Controles */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => updateItem(item.id, item.quantity_buy - 1)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">
                  {item.quantity_buy}
                </span>
                <Button
                  onClick={() => updateItem(item.id, item.quantity_buy + 1)}
                  variant="ghost"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(item.id)}
                className="text-muted-foreground"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total y botón de finalizar compra */}
      <div className="border-t mt-2 px-4 py-4 bg-white shadow-md">
        <div className="flex justify-between mb-4 text-lg font-semibold">
          <span>Total</span>
          <span>S/{total.toFixed(2)}</span>
        </div>
        <Button
          onClick={handleSendMessage}
          className="w-full bg-[#00bfa5] text-white hover:bg-[#00a58e]"
        >
          Finalizar Compra
          <FaWhatsapp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
