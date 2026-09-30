import React, { useState, useEffect, useMemo, useRef } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import { Navbar } from './components/Navbar'
import { HeroBanner } from './components/HeroBanner'
import { CategoryFilter } from './components/CategoryFilter'
import { ProductCard } from './components/ProductCard'
import { ProductModal } from './components/ProductModal'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutModal } from './components/CheckoutModal'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { SupabaseModal } from './components/SupabaseModal'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { productService } from './services/productService'
import { Sparkles, Diamond, AlertCircle, RefreshCw } from 'lucide-react'

function StoreContent() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('todos')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [completedOrder, setCompletedOrder] = useState(null)
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false)

  const { toast } = useCart()
  const catalogRef = useRef(null)

  // Cargar catálogo (desde Supabase o datos de respaldo)
  useEffect(() => {
    async function loadCatalog() {
      setLoading(true)
      try {
        const data = await productService.getProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error cargando catálogo:', err)
      } finally {
        setLoading(false)
      }
    }
    loadCatalog()
  }, [])

  const handleExploreClick = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Filtro de categoría
        const matchCategory = activeCategory === 'todos' || p.category === activeCategory

        // Filtro de material
        const matchMaterial = selectedMaterial === 'all' || (p.materials && p.materials.some(m => m.toLowerCase().includes(selectedMaterial.toLowerCase())))

        // Filtro de búsqueda textual
        const query = searchQuery.trim().toLowerCase()
        const matchSearch = !query || 
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query)

        return matchCategory && matchMaterial && matchSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        // Default: featured
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
  }, [products, activeCategory, selectedMaterial, sortBy, searchQuery])

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] flex flex-col relative selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      {/* Toast Notification Floating */}
      {toast && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 animate-bounce duration-300">
          <div className="p-3.5 rounded-2xl bg-[#161824] border border-[#d4af37]/60 text-white text-xs shadow-2xl flex items-center gap-2.5 max-w-sm ml-auto backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="flex-1 font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Showcase (Mobile-First) */}
      <HeroBanner onExploreClick={handleExploreClick} />

      {/* Filter Bar with Horizontal Scrolling Chips */}
      <div ref={catalogRef}>
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          selectedMaterial={selectedMaterial}
          onSelectMaterial={setSelectedMaterial}
          itemCount={filteredProducts.length}
        />
      </div>

      {/* Product Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
            <p className="text-sm font-serif text-white">Preparando vitrina exclusiva...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#161824] border border-gray-800 flex items-center justify-center mx-auto text-gray-500">
              <Diamond className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg text-white">No encontramos joyas con ese criterio</h3>
            <p className="text-xs text-gray-400">
              Intenta seleccionar otra categoría o restablece los filtros de búsqueda.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos')
                setSelectedMaterial('all')
                setSearchQuery('')
              }}
              className="px-5 py-2.5 rounded-full gold-gradient-bg text-[#0b0c10] font-semibold text-xs uppercase"
            >
              Ver Todas las Joyas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Details Modal / Mobile Bottom Sheet */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal with Payment Gateways */}
      <CheckoutModal
        onOrderSuccess={(order) => setCompletedOrder(order)}
      />

      {/* Order Success Confirmation */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Supabase Integration & Schema Modal */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

      {/* Floating Concierge WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Luxury Footer */}
      <Footer onSelectCategory={(cat) => {
        setActiveCategory(cat)
        handleExploreClick()
      }} />
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  )
}

export default App
