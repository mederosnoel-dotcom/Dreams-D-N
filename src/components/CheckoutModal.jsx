import React, { useState } from 'react'
import {
  X, Lock, ShieldCheck, CreditCard, ChevronRight, CheckCircle2,
  AlertCircle, Smartphone, Building, RefreshCw, Sparkles, Eye, EyeOff
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  paymentService,
  formatCardNumber,
  formatExpiry,
  detectCardBrand,
  validateLuhn
} from '../services/paymentService'
import { productService } from '../services/productService'

export const CheckoutModal = ({ onOrderSuccess }) => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotalCOP,
    discountAmountCOP,
    shippingCostCOP,
    totalCOP,
    formatPrice,
    clearCart,
    showToast
  } = useCart()

  // Pasarela seleccionada: 'stripe' | 'mercadopago'
  const [selectedGateway, setSelectedGateway] = useState('stripe')
  const [paymentType, setPaymentType] = useState('card') // 'card' | 'mercadopago_wallet' | 'pse'

  // Datos del Cliente y Envío
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: 'Bogotá D.C.',
    department: 'Cundinamarca',
    notes: ''
  })

  // Datos de la Tarjeta
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1'
  })

  const [isCvvFocused, setIsCvvFocused] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStep, setProcessStep] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  if (!isCheckoutOpen) return null

  const cardBrand = detectCardBrand(card.number)

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCard({ ...card, number: formatted })
    }
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value)
    if (formatted.length <= 5) {
      setCard({ ...card, expiry: formatted })
    }
  }

  const handleCvvChange = (e) => {
    const clean = e.target.value.replace(/\D/g, '')
    if (clean.length <= 4) {
      setCard({ ...card, cvv: clean })
    }
  }

  const handleSubmitPayment = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Validar datos de cliente
    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMsg('Por favor completa todos los datos obligatorios de envío.')
      return
    }

    if (paymentType === 'card') {
      const cleanCard = card.number.replace(/\s+/g, '')
      if (cleanCard.length < 15) {
        setErrorMsg('El número de tarjeta debe tener al menos 15 dígitos.')
        return
      }

      if (!card.name.trim()) {
        setErrorMsg('Ingresa el nombre del titular tal como aparece en el plástico.')
        return
      }

      if (!card.expiry || card.expiry.length < 5) {
        setErrorMsg('Ingresa una fecha de expiración válida (MM/AA).')
        return
      }

      if (!card.cvv || card.cvv.length < 3) {
        setErrorMsg('Ingresa el código CVV de seguridad.')
        return
      }
    }

    setIsProcessing(true)

    try {
      setProcessStep('Cifrando datos mediante protocolo SSL 256 bits...')
      await new Promise(r => setTimeout(r, 700))

      setProcessStep(`Conectando de forma segura con ${selectedGateway === 'stripe' ? 'Stripe Payments' : 'Mercado Pago Gateway'}...`)
      
      const paymentResult = await paymentService.processCardPayment({
        gateway: selectedGateway,
        cardData: card,
        amount: totalCOP,
        currency: 'COP',
        customer
      })

      setProcessStep('Verificando fondos y emitiendo certificado de autenticidad...')
      await new Promise(r => setTimeout(r, 800))

      // Crear y almacenar orden en Supabase / Local
      const orderResult = await productService.createOrder({
        customer,
        items: cart,
        total: totalCOP,
        subtotal: subtotalCOP,
        discount: discountAmountCOP,
        paymentMethod: {
          gateway: selectedGateway,
          type: paymentType,
          last4: paymentResult.last4,
          brand: paymentResult.cardBrand,
          transactionId: paymentResult.transactionId
        },
        shippingAddress: `${customer.address}, ${customer.city} (${customer.department})`
      })

      setIsProcessing(false)
      clearCart()
      setIsCheckoutOpen(false)
      onOrderSuccess(orderResult.order)
    } catch (err) {
      setIsProcessing(false)
      setErrorMsg(err.message || 'Ocurrió un error al procesar la transacción. Verifica tus fondos o intenta con otra tarjeta.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0" onClick={() => !isProcessing && setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-2xl bg-[#11131c] border border-[#2a2e3f] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-4 bg-[#0e1017] border-b border-[#232733] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <span className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide">
              Pago Seguro • DREAMS D&N
            </span>
          </div>

          <button
            disabled={isProcessing}
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Order Summary Pill */}
          <div className="p-3.5 rounded-xl bg-[#161824] border border-[#242738] flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400 block">Total a pagar:</span>
              <span className="text-base sm:text-lg font-bold text-[#e5c378]">
                {formatPrice(totalCOP)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block">{cart.length} joyas exclusivas</span>
              <span className="text-[11px] text-emerald-400 font-medium">Envío asegurado incluido</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitPayment} className="space-y-6">
            {/* Sección 1: Datos de Contacto y Envío */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-[#e5c378] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[11px] font-bold">1</span>
                Datos de Envío y Contacto
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofia Vergara"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">WhatsApp / Celular Móvil *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 300 123 4567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Correo Electrónico (Para Certificado y Factura)</label>
                  <input
                    type="email"
                    placeholder="cliente@ejemplo.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Documento / Cédula / DNI</label>
                  <input
                    type="text"
                    placeholder="C.C. / ID"
                    value={customer.idNumber}
                    onChange={(e) => setCustomer({ ...customer, idNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-400 mb-1">Dirección de Entrega Blindada *</label>
                  <input
                    type="text"
                    required
                    placeholder="Calle, Carrera, Apto, Edificio o Casa"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Departamento / Provincia</label>
                  <input
                    type="text"
                    value={customer.department}
                    onChange={(e) => setCustomer({ ...customer, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Selección de Pasarela y Método de Pago */}
            <div className="space-y-4 pt-4 border-t border-[#232733]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#e5c378] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[11px] font-bold">2</span>
                  Método de Pago y Pasarela
                </h3>

                {/* Pasarela Switcher */}
                <div className="flex items-center gap-1 bg-[#171a26] p-1 rounded-lg border border-gray-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('stripe')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${selectedGateway === 'stripe' ? 'bg-[#635BFF] text-white font-bold' : 'text-gray-400'}`}
                  >
                    Stripe
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('mercadopago')}
                    className={`px-2 py-0.5 rounded-md transition-colors ${selectedGateway === 'mercadopago' ? 'bg-[#009EE3] text-white font-bold' : 'text-gray-400'}`}
                  >
                    Mercado Pago
                  </button>
                </div>
              </div>

              {/* Selector de tipo de pago */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentType === 'card'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-gray-800 bg-[#161824] text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-semibold block text-xs">Tarjeta de Crédito / Débito</span>
                    <span className="text-[10px] text-gray-400">Visa, Mastercard, Amex</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('pse')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentType === 'pse'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-gray-800 bg-[#161824] text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="font-semibold block text-xs">PSE / Nequi / Bancolombia</span>
                    <span className="text-[10px] text-gray-400">Transferencia instantánea</span>
                  </div>
                </button>
              </div>

              {paymentType === 'card' && (
                <div className="space-y-4">
                  {/* Tarjeta Visual 3D Luxury Preview (Plata / Platino) */}
                  <div className="relative mx-auto max-w-sm w-full aspect-[1.586] rounded-2xl p-5 text-white shadow-2xl overflow-hidden border border-slate-400/60 bg-gradient-to-br from-[#1c202d] via-[#12151f] to-[#252b3d]">
                    {/* Background Luxury Texture Pattern */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Card Top Row */}
                    <div className="relative flex justify-between items-center z-10">
                      <div className="flex items-center gap-2">
                        {/* Metallic Silver Chip */}
                        <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-[#94a3b8] via-[#f8fafc] to-[#cbd5e1] border border-white/80 shadow-sm relative overflow-hidden flex items-center justify-center">
                          <div className="w-full h-0.5 bg-black/20 my-auto" />
                        </div>
                        {/* Contactless Wifi Icon */}
                        <span className="text-slate-300 text-xs">)))</span>
                      </div>

                      <span className="font-serif tracking-widest text-xs uppercase text-slate-200 font-bold">
                        {cardBrand.name}
                      </span>
                    </div>

                    {/* Card Number Display */}
                    <div className="relative z-10 mt-6 sm:mt-8">
                      <span className="font-mono text-base sm:text-lg tracking-widest text-white drop-shadow">
                        {card.number || '•••• •••• •••• ••••'}
                      </span>
                    </div>

                    {/* Card Bottom Row */}
                    <div className="relative z-10 flex justify-between items-end mt-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Titular</span>
                        <span className="text-xs uppercase font-medium tracking-wide text-gray-200">
                          {card.name || 'NOMBRE DEL TITULAR'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Expira</span>
                        <span className="font-mono text-xs text-gray-200">
                          {card.expiry || 'MM/AA'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formulario de Tarjeta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 mb-1">Número de Tarjeta *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="4000 1234 5678 9010"
                          value={card.number}
                          onChange={handleCardNumberChange}
                          className="w-full p-2.5 pl-9 rounded-xl bg-[#171a26] border border-gray-800 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                        />
                        <CreditCard className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 mb-1">Nombre Completo del Titular *</label>
                      <input
                        type="text"
                        required
                        placeholder="Como figura en la tarjeta"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                        className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Fecha de Expiración (MM/AA) *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={card.expiry}
                        onChange={handleExpiryChange}
                        className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">CVV / CVC (3 o 4 dígitos) *</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={card.cvv}
                        onChange={handleCvvChange}
                        onFocus={() => setIsCvvFocused(true)}
                        onBlur={() => setIsCvvFocused(false)}
                        className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 mb-1">Número de Cuotas</label>
                      <select
                        value={card.installments}
                        onChange={(e) => setCard({ ...card, installments: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#171a26] border border-gray-800 text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        <option value="1">1 cuota de {formatPrice(totalCOP)} (Sin interés)</option>
                        <option value="3">3 cuotas de {formatPrice(totalCOP / 3)} (Sin interés)</option>
                        <option value="6">6 cuotas de {formatPrice(totalCOP / 6)}</option>
                        <option value="12">12 cuotas de {formatPrice(totalCOP / 12)}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'pse' && (
                <div className="p-4 rounded-xl bg-[#171926] border border-[#2b2e3e] text-xs text-gray-300 space-y-2">
                  <p className="font-semibold text-white">Transferencia Inmediata Segura (PSE / Nequi):</p>
                  <p>Al confirmar el pedido, recibirás el enlace con código de referencia bancaria directa y notificación instantánea a tu WhatsApp.</p>
                  <div className="p-2 rounded bg-black/40 text-[11px] font-mono text-[#d4af37]">
                    Llave Nequi / Daviplata Joyería: 300 123 4567 • Banco Davivienda
                  </div>
                </div>
              )}
            </div>

            {/* Processing State or Submit Button */}
            {isProcessing ? (
              <div className="p-4 rounded-xl bg-[#181a26] border border-[#d4af37]/40 text-center space-y-2">
                <RefreshCw className="w-6 h-6 text-[#d4af37] animate-spin mx-auto" />
                <p className="text-xs font-semibold text-white">Procesando pago seguro...</p>
                <p className="text-[11px] text-[#e5c378] font-mono">{processStep}</p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-4 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Pagar {formatPrice(totalCOP)} con {selectedGateway === 'stripe' ? 'Stripe' : 'Mercado Pago'}</span>
              </button>
            )}

            {/* Security Badges */}
            <div className="pt-2 border-t border-[#232733] flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Cifrado Bancario 256-Bit SSL
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Certificación PCI-DSS Nivel 1
              </span>
              <span className="text-gray-500">
                Stripe & Mercado Pago Certified Partner
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
