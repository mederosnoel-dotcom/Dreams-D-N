import React from 'react'
import { Sparkles, CircleDot, Gem, Watch, Flame, ArrowUpDown } from 'lucide-react'
import { CATEGORIES } from '../data/mockProducts'

export const CategoryFilter = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  selectedMaterial,
  onSelectMaterial,
  itemCount
}) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />
      case 'CircleDot': return <CircleDot className="w-4 h-4" />
      case 'Gem': return <Gem className="w-4 h-4" />
      case 'Watch': return <Watch className="w-4 h-4" />
      case 'Flame': return <Flame className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  const materials = [
    { id: 'all', label: 'Toda la Plata' },
    { id: 'Plata Ley 925', label: 'Plata Ley 925' },
    { id: 'Plata Rodinada', label: 'Plata Rodinada' },
    { id: 'Plata con Circones', label: 'Plata con Circones' },
    { id: 'Plata Envejecida', label: 'Plata Envejecida / Bali' }
  ]

  return (
    <div className="w-full bg-[#0c0e14] border-b border-[#1f2330] py-4 sticky top-[102px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        {/* Horizontal Category Chips (Touch Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'silver-gradient-bg text-[#090a0f] font-semibold shadow-md shadow-white/20 scale-105'
                    : 'bg-[#151722] text-gray-300 border border-gray-800 hover:border-slate-400 hover:text-white'
                }`}
              >
                <span>{getIcon(cat.icon)}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Sub-Filters: Material Chips & Sorter in clean mobile bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1a1c26]">
          {/* Metal selection */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider hidden sm:inline mr-1">Tipo:</span>
            {materials.map((mat) => (
              <button
                key={mat.id}
                onClick={() => onSelectMaterial(mat.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  selectedMaterial === mat.id
                    ? 'bg-slate-700/80 text-white border border-slate-400 font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>

          {/* Sorter and Count */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[11px] text-gray-400">
              {itemCount} {itemCount === 1 ? 'joya' : 'joyas'}
            </span>

            <div className="flex items-center gap-1 bg-[#151722] px-2.5 py-1 rounded-lg border border-gray-800 text-xs">
              <ArrowUpDown className="w-3 h-3 text-slate-300" />
              <select
                value={sortBy}
                onChange={(e) => onSelectSort(e.target.value)}
                className="bg-transparent text-gray-300 text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-[#151722]">Destacados</option>
                <option value="price-asc" className="bg-[#151722]">Menor Precio</option>
                <option value="price-desc" className="bg-[#151722]">Mayor Precio</option>
                <option value="rating" className="bg-[#151722]">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
