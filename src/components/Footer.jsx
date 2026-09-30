import React from 'react'
import { Diamond, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#08090d] border-t border-[#1d202b] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
                DREAMS <span className="gold-gradient-text">D&N</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Maison de alta orfebrería y diseño de joyas finas en auténtica Plata Esterlina Ley 925. Cada pieza es forjada con acabados rodinados antideslustre y circones de máximo brillo.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#141620] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-slate-400 transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#141620] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-slate-400 transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Colecciones */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-serif font-semibold tracking-wider uppercase text-xs">
              Colecciones en Plata
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('anillos')} className="hover:text-slate-200 transition-colors">
                  Anillos en Plata 925
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('collares')} className="hover:text-slate-200 transition-colors">
                  Cadenas & Dijes 925
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pulseras')} className="hover:text-slate-200 transition-colors">
                  Pulseras & Manillas
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('aretes')} className="hover:text-slate-200 transition-colors">
                  Aretes, Candongas & Topos
                </button>
              </li>
            </ul>
          </div>

          {/* Garantías y Servicios */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-serif font-semibold tracking-wider uppercase text-xs">
              Garantía de Plata
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
                <span>Certificado de Pureza Ley 925</span>
              </li>
              <li>Garantía de Autenticidad Vitalicia</li>
              <li>Guía de Limpieza & Cuidado de Plata</li>
              <li>Envíos Asegurados a Todo el País</li>
              <li>Políticas de Cambio y Devolución</li>
            </ul>
          </div>

          {/* Contacto & Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-serif font-semibold tracking-wider uppercase text-xs">
              Mundo Privado DREAMS D&N
            </h4>
            <p className="text-gray-400 text-xs">
              Suscríbete para recibir invitaciones a preventas privadas y catálogos de edición limitada.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full px-3 py-2 rounded-xl bg-[#141620] border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={() => alert("¡Gracias por suscribirte al Círculo Privado de DREAMS D&N!")}
                className="px-3 py-2 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase"
              >
                Unirme
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Payment Icons & Copyright */}
        <div className="pt-8 border-t border-[#1d202b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} DREAMS D&N. Todos los derechos reservados. Joyería fina artesanal.
          </p>

          {/* Security and Payment Logos */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-gray-400">
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">VISA</span>
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">AMERICAN EXPRESS</span>
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">STRIPE</span>
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">MERCADO PAGO</span>
            <span className="px-2 py-1 rounded bg-[#13151f] border border-gray-800 font-mono">PSE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
