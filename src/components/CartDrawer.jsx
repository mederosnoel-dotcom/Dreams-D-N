import React, { useState } from 'react'
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Tag, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    subtotalCOP,
    discountAmountCOP,
    shippingCostCOP,
    totalCOP,
    formatPrice,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold
  } = useCart()

  const [inputCoupon, setInputCoupon] = useState('')
  const [couponError, setCouponError] = useState('')

  if (!isCartOpen) return null

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    setCouponError('')
    if (!inputCoupon.trim()) return
    const res = applyCoupon(inputCoupon)
    if (!res.success) {
      setCouponError(res.message)
    } else {
      setInputCoupon('')
    }
  }

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  // Progreso de envío gratis
  const freeShippingProgress = Math.min(100, Math.round((subtotalCOP / freeShippingThreshold) * 100))
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalCOP)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11131b] border-l border-[#242735] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-[#232733] bg-[#0e1017] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-serif text-lg font-semibold text-white tracking-wide">
                Bolsa de Compras
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#1d202c] text-[#e5c378] border border-[#d4af37]/30">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 py-3 bg-[#161822] border-b border-[#232733] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-300">
                  <span>Envío Blindado Asegurado</span>
                  <span className="text-[#e5c378] font-medium">
                    Faltan {formatPrice(remainingForFreeShipping)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#252835] rounded-full overflow-hidden">
                  <div
                    className="h-full gold-gradient-bg transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>¡Felicidades! Tienes Envío Asegurado 100% GRATIS</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#212433]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181a24] border border-[#2b2e3e] flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-medium text-white mb-1">
                    Tu bolsa está vacía
                  </h3>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Descubre nuestras piezas de alta joyería en oro de 18k y gemas certificadas.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full gold-gradient-bg text-[#0b0c10] text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110"
                >
                  Explorar Joyas
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.key} className="py-4 flex gap-3">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#161822] border border-[#242735] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm font-medium text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                          title="Eliminar de la bolsa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span className="text-[#e5c378]">{item.selectedMaterial}</span>
                        <span>•</span>
                        <span>Talla: {item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-700 bg-[#161824] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="p-1 px-2 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="p-1 px-2 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-[#e5c378]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#232733] bg-[#0e1017] space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Cupón (ej: DREAMS10)"
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#161822] border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#202330] hover:bg-[#2b3042] text-xs font-semibold text-gray-200 border border-gray-700"
                >
                  Aplicar
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <span>Cupón {couponCode} ({discountPercent * 100}% desc.)</span>
                  <button onClick={removeCoupon} className="text-xs underline hover:text-white">
                    Quitar
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-red-400">{couponError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-[#1e212b]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(subtotalCOP)}</span>
                </div>

                {discountAmountCOP > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento de Promoción</span>
                    <span>-{formatPrice(discountAmountCOP)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío Asegurado Nacional</span>
                  <span>{shippingCostCOP === 0 ? <span className="text-emerald-400 font-medium">Gratis</span> : formatPrice(shippingCostCOP)}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-[#232733]">
                  <span>Total a Pagar</span>
                  <span className="text-[#e5c378]">{formatPrice(totalCOP)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Transacción encriptada con tecnología bancaria 256-bit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
