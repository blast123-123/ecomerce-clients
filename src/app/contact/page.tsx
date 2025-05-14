'use client'
import { SiGooglemaps } from 'react-icons/si'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { configContacts } from '@/config/details'
import { LocateIcon, PhoneCallIcon, SquareSigma } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

const redes = [
  {
    icon: <LocateIcon />,
    title: 'Location',
    text: 'Los Jazmines mz M lte 19, Ate 15494',
    link: 'https://maps.app.goo.gl/1ZaKxiaBfcE2zyx59',
    linkIcon: <SiGooglemaps />,
  },
  {
    icon: <PhoneCallIcon />,
    title: 'Numero celular',
    text: configContacts.whatssapNumber,
  },
  {
    icon: <SquareSigma />,
    title: 'Email',
    text: 'cibernetics@hotmail.com',
  },
]

const icons = [
  {
    icon: <FaFacebookF />,
    link: '#',
  },
]
const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message)
      return toast.warning('Por favor completa todos los campos', {
        position: 'top-center',
        duration: 2000,
      })
    const message = `Hola, soy ${form.name}. Mi correo es ${form.email} y mi teléfono es ${form.phone}. Mensaje: ${form.message}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${configContacts.whatsappContact}?text=${encodedMessage}`

    window.open(whatsappURL, '_blank')
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
    toast.success('Mensaje enviado con exito', {
      position: 'top-center',
      duration: 2000,
    })
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  const sendMessageWhatsapp = () => {
    const message = `Hola, necesito información sobre tus servicios. `

    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${configContacts.whatsappContact}?text=${encodedMessage}`

    window.open(whatsappURL, '_blank')
    toast.success('Mensaje enviado con exito', {
      position: 'top-center',
      duration: 2000,
    })
  }

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
            CONTACTO
          </h1>
        </div>
      </div>
      <section className="px-4 mt-20 py-10 md:px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-muted p-8 rounded-xl shadow-lg">
          {/* Left Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">
                Contactanos
              </h1>
              <p className="text-muted-foreground">
                Si tienes alguna pregunta o necesitas información sobre nuestros
                servicios, no dudes en ponerte en contacto con nosotros. Estamos
                aquí para ayudarte.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {redes.map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/5 border rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.text}</p>
                    {item.link && (
                      <div className="flex gap-2 items-center">
                        {item.linkIcon}
                        <a
                          href="https://maps.app.goo.gl/1ZaKxiaBfcE2zyx59"
                          target="_blank"
                          className="underline text-primary underline-offset-2"
                        >
                          Nuestra dirección
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Siguenos</h3>
              <div className="flex space-x-3">
                {icons.map((icon, i) => (
                  <a
                    key={i}
                    target='__blank'
                    href="https://www.facebook.com/cyb3rn3ticsCor3?rdid=xwqX0xfjDzRxYnCA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DdqaDAzvu%2F#"
                    className="w-9 h-9 rounded-full bg-background shadow flex items-center justify-center hover:scale-105 transition"
                  >
                    {icon.icon}
                  </a>
                ))}
              </div>
            </div>

            <Image
              src="/logo.jpg"
              alt="Team working together"
              width={800}
              height={600}
              className="rounded-lg shadow w-full h-auto object-cover mt-6"
              priority
            />
          </div>

          {/* Form */}
          <div className="bg-background p-6 rounded-xl flex flex-col justify-center shadow space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="mb-2">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="email" className="mb-2">
                  Hotmail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2">
                  Numero de telefono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-2">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aqui"
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white "
              >
                Enviar mensaje a whatsapp
              </Button>

              <p className="text-center text-sm text-muted-foreground pt-2">
                Atendemos de lunes a viernes de 9am a 6pm
              </p>
            </form>

            {/* Live Chat */}
            <div className="pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Were online now
                  </p>
                </div>
                <Button
                  onClick={sendMessageWhatsapp}
                  variant="outline"
                  className="text-sm px-4 py-2"
                >
                  <FaWhatsapp />
                  <span className="ml-1">Whatsapp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
