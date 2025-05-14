import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar/main.navbar'
import { ProviderQueryClient } from '@/provider/QueryClient'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/footer'
export const metadata: Metadata = {
  title: 'Cibernetics Core',
  description: 'Description page cibernetics core',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#10B981"
          initialPosition={0.08}
          crawlSpeed={400}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          zIndex={9999999999999}
          showAtBottom={false}
        />
        <ProviderQueryClient>
          <Navbar />
          {children}
          <Footer/>
        </ProviderQueryClient>
        <Toaster />
      </body>
    </html>
  )
}
