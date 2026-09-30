import React, { useState } from 'react'
import { X, Star, Heart, ShieldCheck, Award, Truck, Check, Share2, MessageCircle, ShoppingBag, Sparkles, Edit3 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const ProductModal = ({ product, onClose, onEdit }) => {
  if (!product) return null

  const { addToCart, setIsCartOpen, setIsCheckoutOpen, toggleWishlist, isWishlisted, formatPrice } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials ? product.materials[0] : 'Plata Fina')
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Estándar')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addToCart(product, {
      material: selectedMaterial,
      size: selectedSize,
      quantity
    })
  }

  const handleBuyNow = () => {
    addToCart(product, {
      material: selectedMaterial,
      size: selectedSize,
      quantity
    })
    onClose()
    setIsCheckoutOpen(true)
  }

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hola DREAMS D&N, estoy interesado en la joya "${product.name}" (${selectedMaterial}, Talla/Medida: ${selectedSize}). ¿Tienen disponibilidad inmediata para entrega?`
    )
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container (Bottom Sheet on mobile, centered modal on desktop) */}
      <div className="relative w-full max-w-4xl bg-[#12141c] border border-[#2a2e3d] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Top Header Actions */}
        <div className="flex items-center justify-between p-4 border-b border-[#232733] bg-[#10121a]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#d4af37]/20 text-[#e5c378] border border-[#d4af37]/30">
              {product.categoryLabel}
            </span>
            {product.tag && (
              <span className="text-[11px] text-gray-400 font-medium">
                • {product.tag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                onClick={() => {
                  onClose()
                  onEdit(product)
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full transition-colors mr-1"
                title="Editar datos de esta joya"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 text-gray-400 hover:text-[#d4af37] transition-colors rounded-full"
              title="Guardar en favoritos"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#e5c378] text-[#e5c378]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0c0d12] border border-[#252835]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-gray-300">
                {selectedImageIndex + 1} de {product.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-[#d4af37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="hidden sm:grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#171924] border border-[#262937] text-center text-xs">
              <div className="flex flex-col items-center gap-1 text-gray-300">
                <Award className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] font-medium">Plata Auténtica</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-slate-300" />
                <span className="text-[10px] font-medium">Garantía Vitalicia</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-300">
                <Truck className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] font-medium">Envío Blindado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Customization */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviewCount} opiniones verificadas)</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#e5c378]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    En Stock ({product.stock} disponibles)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Metal / Material Selector */}
              {product.materials && (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Seleccionar Metal Precioso: <span className="text-[#e5c378]">{selectedMaterial}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          selectedMaterial === mat
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white font-semibold shadow-md'
                            : 'bg-[#181a24] border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {selectedMaterial === mat && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                        <span>{mat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes Selector */}
              {product.sizes && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Talla / Medida: <span className="text-[#e5c378]">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[11px] text-[#d4af37] hover:underline"
                    >
                      {showSizeGuide ? 'Ocultar guía' : '¿Cómo medir mi talla?'}
                    </button>
                  </div>

                  {showSizeGuide && (
                    <div className="p-3 mb-2 rounded-xl bg-[#181a24] border border-[#2b2f3d] text-[11px] text-gray-300 leading-normal space-y-1">
                      <p className="font-semibold text-white">Guía Rápida de Medición:</p>
                      <p>1. Envuelve una tira de papel alrededor del nudillo de tu dedo.</p>
                      <p>2. Marca el punto de encuentro y mide los milímetros con una regla.</p>
                      <p>3. Talla 6 = 16.5 mm • Talla 7 = 17.3 mm • Talla 8 = 18.1 mm</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedSize === size
                            ? 'gold-gradient-bg text-[#0b0c10] font-bold border-[#d4af37]'
                            : 'bg-[#181a24] border-gray-800 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Box */}
              {product.specs && (
                <div className="p-3.5 rounded-xl bg-[#151722] border border-[#232635] text-xs space-y-1.5">
                  <h4 className="font-semibold text-white text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    Ficha Técnica de Joyería
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-gray-300 text-[11px]">
                    <div><span className="text-gray-500">Metal:</span> {product.specs.metal}</div>
                    <div><span className="text-gray-500">Gema:</span> {product.specs.gem}</div>
                    <div><span className="text-gray-500">Peso aprox:</span> {product.specs.weight}</div>
                    <div><span className="text-gray-500">Certificación:</span> {product.specs.guarantee}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Sticky in Sheet */}
            <div className="pt-4 border-t border-[#232733] space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-700 bg-[#161822] rounded-xl px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1f2333] hover:bg-[#282d42] border border-[#d4af37]/40 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                  <span>Agregar a la Bolsa</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#d4af37]/20 transition-all hover:brightness-110 active:scale-95"
              >
                Comprar Ahora con Tarjeta
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full py-2.5 rounded-xl border border-gray-800 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Consultar con un Joyero por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
