import React, { useState } from 'react'
import { ShoppingBag, Heart, Search, Diamond, Sparkles, X, PlusCircle, Database } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { isSupabaseConfigured } from '../lib/supabase'

export const Navbar = ({ onOpenSupabaseModal, onOpenAddProduct, searchQuery, setSearchQuery }) => {
  const { totalItemCount, setIsCartOpen, wishlist, currency, setCurrency } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#232733]/80 transition-all">
      {/* Top Banner Exclusivo */}
      <div className="bg-gradient-to-r from-[#171922] via-[#242118] to-[#171922] border-b border-[#d4af37]/20 text-[11px] md:text-xs py-1.5 px-4 text-center text-[#e5c378] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
        <span className="tracking-widest uppercase font-medium">
          DREAMS D&N • Envío Asegurado de Cortesía & Estuche de Terciopelo
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Mobile Database & Currency Switcher */}
        <div className="flex items-center gap-2">
          {/* Selector de Moneda */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#161821] text-[#d4af37] text-xs font-semibold px-2 py-1.5 rounded-full border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="COP">COP ($)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MXN">MXN ($)</option>
            </select>
          </div>

          {/* Botón estado de Base de Datos Supabase */}
          <button
            onClick={onOpenSupabaseModal}
            title="Configuración de Base de Datos Supabase"
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-full border transition-colors bg-[#13151c] text-gray-300 border-gray-700/60 hover:border-[#d4af37]/60"
          >
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
            <span className="hidden sm:inline">BD:</span>
            <span className="font-mono text-[10px]">{isSupabaseConfigured ? 'Supabase' : 'Local Mock'}</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="text-center cursor-pointer select-none">
          <div className="flex items-center justify-center gap-1.5">
            <Diamond className="w-4 h-4 text-[#d4af37]" />
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-bold text-white uppercase">
              DREAMS <span className="gold-gradient-text">D&N</span>
            </span>
          </div>
          <span className="block text-[8px] tracking-[0.35em] text-[#a1a5b8] uppercase font-light -mt-0.5">
            Alta Joyería & Diamantes
          </span>
        </div>

        {/* Right: Actions (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Botón Administrador: Agregar Joya */}
          <button
            onClick={onOpenAddProduct}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full gold-gradient-bg text-[#0b0c10] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
            title="Introducir nueva joya con foto y precio"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar Joya</span>
          </button>

          {/* Toggle Búsqueda */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-300 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
            aria-label="Buscar joyas"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favoritos */}
          <div className="relative">
            <button
              onClick={() => {
                // Si tiene favoritos, filtra o hace scroll
                const favCount = wishlist.length
                if (favCount === 0) {
                  alert("Aún no tienes joyas guardadas en tu lista de deseos. ¡Toca el corazón en cualquier joya para guardarla!")
                } else {
                  alert(`Tienes ${favCount} joya(s) en tu lista de deseos.`)
                }
              }}
              className="p-2 text-gray-300 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5 relative"
              aria-label="Lista de deseos"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#e5c378] fill-[#e5c378]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#e5c378] text-[#0b0c10] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Bolsa de Compras */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#b8860b]/30 border border-[#d4af37]/50 text-white hover:border-[#d4af37] transition-all active:scale-95"
            aria-label="Ver carrito de compras"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-semibold">{totalItemCount}</span>
            {totalItemCount > 0 && (
              <span className="hidden sm:inline text-[11px] text-gray-300">Bolsa</span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="bg-[#12141c] px-4 py-2.5 border-t border-[#232733] flex items-center gap-2">
          <Search className="w-4 h-4 text-[#d4af37]" />
          <input
            type="text"
            placeholder="Buscar por anillo, zafiro, oro blanco, aretes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </header>
  )
}
