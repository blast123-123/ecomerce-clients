'use client'
import { ServiceCard } from '@/components/services/service.card'
import Image from 'next/image'
import { GrConfigure, } from 'react-icons/gr'
import { GrDocumentConfig } from "react-icons/gr";
const Page = () => {
  const services = [
    {
      id: 1,
      title: 'Instalación',
      description:
        'En Cibernetics Core, nos especializamos en brindar la mejor instalación profesional de cámaras de seguridad para hogares, negocios y oficinas. No solo colocamos cámaras, te brindamos tranquilidad, control y confianza las 24 horas del día.',
      features: [
        'Instalación rápida y sin complicaciones',
        'Monitoreo desde tu celular o computadora',
        'Protección garantizada y asesoría postventa',
        'Técnicos certificados y con experiencia comprobada',
      ],
      icon: <GrDocumentConfig  className="h-10 w-10 text-gray-900" />,
      color: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Mantenimiento',
      description:
        'Mantenimiento, reparación y venta de equipos. Contamos con técnicos certificados y las herramientas adecuadas para mantener tu equipo en óptimas condiciones.',
      features: [
        'Limpieza de sensores',
        'Reparación de lentes',
        'Calibración de equipos',
        'Actualización de firmware',
        'Asesoría en compra de equipos',
      ],
      icon: <GrConfigure className="h-10 w-10 text-gray-900" />,
      color: 'bg-amber-50',
    },
  ]

  return (
    <>
      <div className="relative w-full h-[600px] bg-slate-700 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1549109926-58f039549485?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Productos de seguridad"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            SERVICIOS
          </h1>
        </div>
      </div>

      <section id="services" className="py-16 mx-auto md:py-24">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Nuestros Servicios
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contamos con un equipo altamente capacitado que se asegura de
                que cada instalación sea precisa, discreta y eficiente,
                utilizando tecnología de punta, con equipos HD, visión nocturna,
                acceso remoto desde tu celular y grabación continua.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:gap-12 pt-12 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
