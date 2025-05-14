// app/product/[id]/page.tsx

import DetailsOneProduct from '@/components/products/product-details-id'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductOne({ params }: PageProps) {
  const { id } = await params

  return (
    <>
      <DetailsOneProduct id={id} />
    </>
  )
}
