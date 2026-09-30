import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const CURRENCY_RATES = {
  COP: { symbol: '$', rate: 1, suffix: 'COP', decimals: 0 },
  USD: { symbol: '$', rate: 0.00025, suffix: 'USD', decimals: 0 },
  EUR: { symbol: '€', rate: 0.00023, suffix: 'EUR', decimals: 0 },
  MXN: { symbol: '$', rate: 0.0045, suffix: 'MXN', decimals: 0 }
}

const FREE_SHIPPING_THRESHOLD_COP = 500000 // $500.000 COP para envío gratis

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dreams_dn_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('dreams_dn_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState(null)
  const [currency, setCurrency] = useState('COP')
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [toast, setToast] = useState(null)

  // Persistir carrito
  useEffect(() => {
    try {
      localStorage.setItem('dreams_dn_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  // Persistir lista de deseos
  useEffect(() => {
    try {
      localStorage.setItem('dreams_dn_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error(e)
    }
  }, [wishlist])

  const showToast = (message, type = 'gold') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3200)
  }

  // Generador de clave única por variante
  const getItemKey = (productId, material, size) => `${productId}-${material}-${size}`

  const addToCart = (product, options = {}) => {
    const selectedMaterial = options.material || (product.materials && product.materials[0]) || 'Oro 18K'
    const selectedSize = options.size || (product.sizes && product.sizes[0]) || 'Estándar'
    const quantity = options.quantity || 1
    const key = getItemKey(product.id, selectedMaterial, selectedSize)

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.key === key)
      if (existingIndex > -1) {
        const updated = [...prevCart]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        }
        return updated
      }
      return [...prevCart, {
        key,
        product,
        selectedMaterial,
        selectedSize,
        quantity
      }]
    })

    showToast(`"${product.name}" agregado a tu bolsa de joyas`)
  }

  const updateQuantity = (key, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.key === key) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      }).filter(Boolean)
    })
  }

  const removeFromCart = (key) => {
    setCart(prevCart => prevCart.filter(item => item.key !== key))
    showToast('Joya removida de la bolsa', 'info')
  }

  const clearCart = () => {
    setCart([])
  }

  // Toggle Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Eliminado de favoritos', 'info')
        return prev.filter(id => id !== productId)
      } else {
        showToast('Guardado en tus joyas deseadas ✨')
        return [...prev, productId]
      }
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  // Aplicar cupón promocional
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase()
    if (clean === 'DREAMS10' || clean === 'JOYAS10') {
      setDiscountPercent(0.10)
      setCouponCode(clean)
      showToast('¡Cupón del 10% de descuento aplicado!')
      return { success: true, message: '¡10% de descuento aplicado!' }
    } else if (clean === 'VIP20') {
      setDiscountPercent(0.20)
      setCouponCode(clean)
      showToast('¡Cupón VIP del 20% de descuento aplicado!')
      return { success: true, message: '¡20% de descuento VIP aplicado!' }
    } else {
      showToast('Código de cupón no válido', 'error')
      return { success: false, message: 'Código de cupón inválido' }
    }
  }

  const removeCoupon = () => {
    setDiscountPercent(0)
    setCouponCode('')
    showToast('Cupón removido', 'info')
  }

  // Cálculos financieros
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotalCOP = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const discountAmountCOP = subtotalCOP * discountPercent
  const discountedSubtotalCOP = subtotalCOP - discountAmountCOP
  
  // Envío asegurado gratis si supera el umbral
  const shippingCostCOP = subtotalCOP > 0 && subtotalCOP >= FREE_SHIPPING_THRESHOLD_COP ? 0 : (subtotalCOP > 0 ? 35000 : 0)
  const totalCOP = discountedSubtotalCOP + shippingCostCOP

  // Conversión de moneda
  const formatPrice = (priceInCop) => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.COP
    const converted = priceInCop * rateInfo.rate

    if (currency === 'COP') {
      return `$${Math.round(converted).toLocaleString('es-CO')} COP`
    } else if (currency === 'USD') {
      return `$${Math.round(converted).toLocaleString('en-US')} USD`
    } else if (currency === 'EUR') {
      return `€${Math.round(converted).toLocaleString('es-ES')} EUR`
    } else if (currency === 'MXN') {
      return `$${Math.round(converted).toLocaleString('es-MX')} MXN`
    }
    return `$${Math.round(converted).toLocaleString()} ${currency}`
  }

  return (
    <CartContext.Provider value={{
      cart,
      totalItemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      selectedProductForModal,
      setSelectedProductForModal,
      wishlist,
      toggleWishlist,
      isWishlisted,
      currency,
      setCurrency,
      couponCode,
      discountPercent,
      applyCoupon,
      removeCoupon,
      subtotalCOP,
      discountAmountCOP,
      shippingCostCOP,
      totalCOP,
      formatPrice,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD_COP,
      toast,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe utilizarse dentro de un CartProvider')
  return context
}
