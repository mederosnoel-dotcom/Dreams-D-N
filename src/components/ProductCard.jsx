import React from 'react'
import { Heart, Star, ShoppingBag, Eye, Edit3, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const ProductCard = ({ product, onOpenDetails, onEdit, onDelete }) => {
  const { addToCart, toggleWishlist, isWishlisted, formatPrice } = useCart()
  const wishlisted = isWishlisted(product.id)

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    addToCart(product, {
      material: product.materials ? product.materials[0] : 'Oro 18K',
      size: product.sizes ? product.sizes[0] : 'Estándar',
      quantity: 1
    })
  }

  const handleHeartClick = (e) => {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    if (onEdit) onEdit(product)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${product.name}" del catálogo?`)) {
      if (onDelete) onDelete(product.id)
    }
  }

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-[#12141d] rounded-2xl overflow-hidden border border-[#232734] hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/10 cursor-pointer"
    >
      {/* Visual Image Container with 4:5 mobile ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0e1017]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Gradient dark overlay at bottom of image for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-transparent to-black/30 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#141620]/90 text-[#e5c378] border border-[#d4af37]/40 shadow-sm backdrop-blur-sm">
              {product.tag}
            </span>
          )}
          {product.materials && product.materials[0] && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-black/60 text-gray-300 backdrop-blur-sm">
              {product.materials[0]}
            </span>
          )}
        </div>

        {/* Top-Right Action Controls (Wishlist & Quick Edit/Delete) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {onEdit && (
            <button
              onClick={handleEditClick}
              aria-label="Editar joya"
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#d4af37] transition-transform active:scale-90"
              title="Editar joya"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDeleteClick}
              aria-label="Eliminar joya"
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 hover:text-red-400 transition-transform active:scale-90"
              title="Eliminar joya"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleHeartClick}
            aria-label="Agregar a favoritos"
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#d4af37] transition-transform active:scale-90"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#e5c378] text-[#e5c378]' : 'text-gray-300'}`} />
          </button>
        </div>

        {/* Quick View Pill on Hover / Tap */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-xs text-white border border-white/10">
          <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Ver Detalles y Medidas</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5 text-[11px] text-gray-400">
            <span className="uppercase tracking-wider font-medium text-[#d4af37]/80 text-[10px]">
              {product.categoryLabel || 'Joyería'}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-[9px] text-gray-500">({product.reviewCount || 0})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm sm:text-base font-medium text-white line-clamp-2 mb-1 group-hover:text-[#e5c378] transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#1e222f] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            onClick={handleQuickAdd}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#1e2230] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0b0c10] border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-200 active:scale-95 flex items-center gap-1.5 shrink-0"
            title="Añadir a la bolsa"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  )
}
