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
import { ProductAdminModal } from './components/ProductAdminModal'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { productService } from './services/productService'
import { Sparkles, Diamond, PlusCircle, RefreshCw, Layers } from 'lucide-react'

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
  const [isProductAdminOpen, setIsProductAdminOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const { toast, showToast } = useCart()
  const catalogRef = useRef(null)

  // Cargar catálogo (desde Supabase o datos de respaldo locales)
  const loadCatalog = async () => {
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

  useEffect(() => {
    loadCatalog()
  }, [])

  const handleExploreClick = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenAddProduct = () => {
    setEditingProduct(null)
    setIsProductAdminOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsProductAdminOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId)
      showToast('Joya eliminada del catálogo', 'info')
      loadCatalog()
    } catch (e) {
      console.error(e)
    }
  }

  const handleLoadSamples = () => {
    productService.loadSampleProducts()
    showToast('Joyas de demostración cargadas ✨')
    loadCatalog()
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
          (p.shortDescription && p.shortDescription.toLowerCase().includes(query)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query))

        return matchCategory && matchMaterial && matchSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5)
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
        onOpenAddProduct={handleOpenAddProduct}
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
            <p className="text-sm font-serif text-white">Cargando vitrina de DREAMS D&N...</p>
          </div>
        ) : products.length === 0 ? (
          /* Estado Vacío Inicial: Invitación a agregar sus propios productos */
          <div className="py-16 sm:py-24 text-center max-w-lg mx-auto p-6 rounded-3xl bg-[#12141e] border border-[#2c3042] shadow-2xl space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#1b1e2a] border border-[#d4af37]/40 flex items-center justify-center mx-auto text-[#d4af37] shadow-inner">
              <Diamond className="w-10 h-10 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#e5c378] uppercase tracking-widest block">
                Vitrina Lista & Exclusiva
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Comienza a exhibir tus joyas
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Los productos iniciales han sido retirados. Ahora puedes introducir tus propias joyas con sus fotos (desde tu móvil o PC), precio, metales y características personalizadas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Introducir Mi Primera Joya</span>
              </button>

              <button
                onClick={handleLoadSamples}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-gray-700 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-all"
              >
                Cargar 2 Joyas de Muestra
              </button>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Filtros sin resultado */
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
          /* Galería de Joyas del Propietario */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide flex items-center gap-2">
                <span>Colección en Exhibición</span>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#191c28] text-[#e5c378] border border-[#d4af37]/30">
                  {filteredProducts.length}
                </span>
              </h2>

              <button
                onClick={handleOpenAddProduct}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161824] hover:bg-[#202332] border border-[#d4af37]/40 text-[#e5c378] text-xs font-semibold transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>+ Agregar otra joya</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={setSelectedProduct}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Details Modal / Mobile Bottom Sheet */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEdit={handleEditProduct}
      />

      {/* Product Admin / Creator Modal */}
      <ProductAdminModal
        isOpen={isProductAdminOpen}
        onClose={() => {
          setIsProductAdminOpen(false)
          setEditingProduct(null)
        }}
        onProductsUpdated={loadCatalog}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
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
