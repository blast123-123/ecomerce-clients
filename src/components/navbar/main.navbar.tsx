'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ShoppingCartButton } from '../cart/cart'
import { useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-slate-50 !text-primary  shadow-md">
      <div className="container flex h-16 items-center mx-auto justify-between px-4 md:px-6">
        {/* Logo y navegación */}
        <div className="flex items-center space-x-16">
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-tight">
              Cibernetics Core
            </span>
          </Link>

          <nav className="hidden md:flex  items-center !text-primary space-x-10">
            <NavLink href="/" label="Productos" />
            <NavLink href="/services" label="Servicios" />
            <NavLink href="/contact" label="Contacto" />
          </nav>
        </div>

        {/* Iconos de carrito y menú */}
        <div className="flex items-center gap-3">
          <ShoppingCartButton />

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" className="text-white bg-primary ">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-blue-900">Menú</SheetTitle>
                <SheetDescription className="text-blue-900">
                  Bienvenido
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-8 gap-4">
                <MobileNavLink
                  href="/"
                  label="Productos"
                  closeMenu={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  href="/services"
                  label="Servicios"
                  closeMenu={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  href="/contact"
                  label="Contacto"
                  closeMenu={() => setIsMenuOpen(false)}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition-colors flex gap-2 items-center hover:text-blue-600 text-primary text-sm font-medium"
    >
      {label}
      {icon}
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  closeMenu,
}: {
  href: string
  label: string
  closeMenu: () => void
}) {
  return (
    <Link
      href={href}
      className="text-base font-medium text-primary  hover:underline"
      onClick={closeMenu}
    >
      {label}
    </Link>
  )
}
