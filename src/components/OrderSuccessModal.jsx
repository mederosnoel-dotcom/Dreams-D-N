import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { CheckCircle, Sparkles, MessageCircle, Package, Download, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const OrderSuccessModal = ({ order, onClose }) => {
  if (!order) return null
  const { formatPrice } = useCart()

  useEffect(() => {
    // Disparar confeti dorado y plateado
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3e5ab', '#ffffff', '#e5c378']
      })
    } catch (e) {
      console.error(e)
    }
  }, [order])

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `¡Hola DREAMS D&N! Acabo de completar mi orden de compra *#${order.order_id}* por valor de ${formatPrice(order.total)}. Deseo recibir el seguimiento del envío asegurado y el certificado digital de autenticidad.`
    )
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-[#12141e] border border-[#d4af37]/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-[#d4af37]/20 space-y-6">
        {/* Celebration Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#f3e5ab]/30 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-lg">
          <CheckCircle className="w-8 h-8 text-[#d4af37]" />
          <Sparkles className="w-4 h-4 text-[#f3e5ab] absolute -top-1 -right-1 animate-spin" />
        </div>

        {/* Headings */}
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
            Transacción Aprobada • DREAMS D&N
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            ¡Felicidades por tu Elección!
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            Hemos recibido el pago y comenzado el protocolo de alistamiento de tu joya en estuche de terciopelo con sello de lacre y certificado de gemología.
          </p>
        </div>

        {/* Order Card Detail */}
        <div className="p-4 rounded-2xl bg-[#171a26] border border-[#262a3a] text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-[#232735]">
            <span className="text-gray-400">Número de Orden:</span>
            <span className="font-mono font-bold text-[#e5c378] text-sm">{order.order_id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Titular de Compra:</span>
            <span className="font-medium text-white">{order.customer?.fullName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Abonado:</span>
            <span className="font-bold text-white">{formatPrice(order.total)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Método de Pago:</span>
            <span className="text-gray-200 uppercase font-mono text-[11px]">
              {order.payment_method?.brand || 'Tarjeta'} •••• {order.payment_method?.last4 || '4242'}
            </span>
          </div>

          <div className="pt-2 border-t border-[#232735] text-[11px] text-gray-400">
            <span className="block text-gray-500">Destino de Entrega Blindada:</span>
            <span className="text-gray-300">{order.shipping_address}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsAppNotify}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Recibir Guía de Despacho en WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Volver a la Tienda
          </button>
        </div>

        {/* Assurance */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Garantía de pureza de ley 750 y diamante certificado 100% genuino</span>
        </div>
      </div>
    </div>
  )
}
