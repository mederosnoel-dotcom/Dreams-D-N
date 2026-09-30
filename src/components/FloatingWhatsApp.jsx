import React from 'react'
import { MessageCircle } from 'lucide-react'

export const FloatingWhatsApp = () => {
  const handleClick = () => {
    const message = encodeURIComponent('Hola DREAMS D&N, me gustaría recibir atención personalizada con un joyero.')
    window.open(`https://wa.me/573000000000?text=${message}`, '_blank')
  }

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Tooltip on hover / view */}
      <span className="hidden sm:inline-block mr-2 px-3 py-1.5 rounded-full bg-[#12141c]/90 text-white text-xs border border-[#d4af37]/30 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        ¿Deseas atención de un joyero?
      </span>

      <button
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-black/60 hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white/20"
      >
        <MessageCircle className="w-7 h-7 fill-white text-transparent" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#12141c] animate-pulse" />
      </button>
    </div>
  )
}
