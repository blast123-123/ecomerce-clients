import Image from 'next/image'

export default function ProductosHeader() {
  return (
    <div className="relative w-full h-[600px] bg-slate-700 overflow-hidden">
      <Image
        src="/EMPRESA.jpg"
        alt="Productos de seguridad"
        fill
        className="object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          BIEVENIDOS
          <br />
          NUESTRA TIENDA
        </h1>
      </div>
    </div>
  )
}
