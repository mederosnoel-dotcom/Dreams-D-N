import React, { useState } from 'react'
import { ShoppingBag, Heart, Search, Diamond, Sparkles, X, PlusCircle, Database } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { isSupabaseConfigured } from '../lib/supabase'

export const Navbar = ({ onOpenSupabaseModal, onOpenAddProduct, searchQuery, setSearchQuery }) => {
  const { totalItemCount, setIsCartOpen, wishlist, currency, setCurrency } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090a0f]/95 backdrop-blur-md border-b border-[#1f2330] transition-all">
      {/* Top Banner Plata 925 */}
      <div className="bg-gradient-to-r from-[#12141c] via-[#1a1d28] to-[#12141c] border-b border-slate-700/40 text-[11px] md:text-xs py-1.5 px-4 text-center text-slate-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-slate-300 animate-pulse" />
        <span className="tracking-widest uppercase font-medium">
          DREAMS D&N • Joyería en Plata Esterlina Ley 925 Certificada • Envío Asegurado
        </span>
        <Sparkles className="w-3.5 h-3.5 text-slate-300 animate-pulse hidden sm:inline" />
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
              className="bg-[#141622] text-slate-200 text-xs font-semibold px-2 py-1.5 rounded-full border border-slate-700/80 focus:outline-none focus:border-slate-400 cursor-pointer"
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
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-full border transition-colors bg-[#13151f] text-gray-300 border-gray-800 hover:border-slate-500"
          >
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`}></span>
            <span className="hidden sm:inline">BD:</span>
            <span className="font-mono text-[10px]">{isSupabaseConfigured ? 'Supabase' : 'Local'}</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="text-center cursor-pointer select-none">
          <div className="flex items-center justify-center gap-1.5">
            <Diamond className="w-4 h-4 text-slate-300" />
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-bold text-white uppercase">
              DREAMS <span className="silver-gradient-text">D&N</span>
            </span>
          </div>
          <span className="block text-[8px] tracking-[0.35em] text-slate-400 uppercase font-light -mt-0.5">
            Plata Esterlina Ley 925
          </span>
        </div>

        {/* Right: Actions (Search, Wishlist, Cart, Add Product) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Botón Administrador: Agregar Joya */}
          <button
            onClick={onOpenAddProduct}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full silver-gradient-bg text-[#090a0f] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
            title="Introducir nueva joya de plata con foto y precio"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar Joya</span>
          </button>

          {/* Toggle Búsqueda */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            aria-label="Buscar joyas"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favoritos */}
          <div className="relative">
            <button
              onClick={() => {
                const favCount = wishlist.length
                if (favCount === 0) {
                  alert("Aún no tienes joyas guardadas en tu lista de deseos. ¡Toca el corazón en cualquier joya para guardarla!")
                } else {
                  alert(`Tienes ${favCount} joya(s) en tu lista de deseos.`)
                }
              }}
              className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5 relative"
              aria-label="Lista de deseos"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-slate-200 fill-slate-200' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-200 text-[#090a0f] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Bolsa de Compras */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-600/60 text-white hover:border-slate-400 transition-all active:scale-95"
            aria-label="Ver carrito de compras"
          >
            <ShoppingBag className="w-4 h-4 text-slate-300" />
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
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por anillos de plata, cadenas 925, pulseras, aretes..."
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
