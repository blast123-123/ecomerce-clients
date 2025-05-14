'use client'

import Link from 'next/link'
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-16 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marca / logo */}
          <div>
            <h2 className="text-2xl font-bold text-white">Cibernetics Core</h2>
            <p className="mt-4 text-sm text-gray-400">
              Creamos experiencias digitales únicas para tu negocio.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/cyb3rn3ticsCor3/"
                target="_blank"
                className="hover:text-white transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Separador y derechos */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Cibernetics Core. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
