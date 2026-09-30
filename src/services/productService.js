import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { INITIAL_PRODUCTS, SAMPLE_PRODUCTS } from '../data/mockProducts'

const LOCAL_STORAGE_PRODUCTS_KEY = 'dreams_dn_custom_products'

export const productService = {
  /**
   * Obtiene todos los productos del catálogo
   */
  async getProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.warn('Error al consultar Supabase, utilizando datos locales:', error.message)
          return this.getLocalProducts()
        }

        if (data) {
          return data.map(item => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []),
            materials: Array.isArray(item.materials) ? item.materials : ['Oro 18K'],
            sizes: Array.isArray(item.sizes) ? item.sizes : ['Estándar']
          }))
        }
      } catch (err) {
        console.error('Fallo en conexión con Supabase:', err)
      }
    }

    return this.getLocalProducts()
  },

  /**
   * Obtiene productos guardados en el almacenamiento local
   */
  getLocalProducts() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Error leyendo productos locales:', e)
    }
    return INITIAL_PRODUCTS
  },

  /**
   * Agrega o edita un producto (en localStorage y en Supabase si está activo)
   */
  async saveProduct(productData) {
    const isNew = !productData.id
    const product = {
      ...productData,
      id: productData.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      created_at: productData.created_at || new Date().toISOString(),
      price: Number(productData.price) || 0,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
      stock: Number(productData.stock) || 1,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 0,
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'],
      materials: Array.isArray(productData.materials) && productData.materials.length > 0
        ? productData.materials
        : ['Oro 18K'],
      sizes: Array.isArray(productData.sizes) && productData.sizes.length > 0
        ? productData.sizes
        : ['Estándar'],
      specs: productData.specs || {
        metal: 'Oro 18K',
        gem: 'Natural',
        weight: 'Garantizado',
        guarantee: 'Certificado DREAMS D&N'
      }
    }

    // Guardar en Supabase si está disponible
    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          const { error } = await supabase.from('products').insert([product])
          if (error) console.error('Error insertando en Supabase:', error)
        } else {
          const { error } = await supabase.from('products').update(product).eq('id', product.id)
          if (error) console.error('Error actualizando en Supabase:', error)
        }
      } catch (err) {
        console.error('Error guardando en Supabase:', err)
      }
    }

    // Guardar en localStorage
    try {
      const current = this.getLocalProducts()
      const index = current.findIndex(p => p.id === product.id)
      let updated
      if (index >= 0) {
        updated = [...current]
        updated[index] = product
      } else {
        updated = [product, ...current]
      }
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(updated))
      return { success: true, product }
    } catch (e) {
      console.error('Error guardando producto local:', e)
      throw e
    }
  },

  /**
   * Elimina un producto por ID
   */
  async deleteProduct(productId) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', productId)
        if (error) console.error('Error eliminando en Supabase:', error)
      } catch (err) {
        console.error('Error en Supabase delete:', err)
      }
    }

    try {
      const current = this.getLocalProducts()
      const filtered = current.filter(p => p.id !== productId)
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(filtered))
      return { success: true }
    } catch (e) {
      console.error('Error eliminando producto local:', e)
      throw e
    }
  },

  /**
   * Elimina todos los productos
   */
  async clearAllProducts() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().neq('id', '0')
      } catch (e) {
        console.error(e)
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY)
    return { success: true }
  },

  /**
   * Carga los productos de ejemplo (opcional si el usuario lo desea)
   */
  loadSampleProducts() {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(SAMPLE_PRODUCTS))
    return SAMPLE_PRODUCTS
  },

  /**
   * Guarda una orden de compra
   */
  async createOrder(orderData) {
    const orderPayload = {
      order_id: `DN-${Math.floor(100000 + Math.random() * 900000)}`,
      created_at: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      total: orderData.total,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      payment_method: orderData.paymentMethod,
      payment_status: 'approved',
      shipping_address: orderData.shippingAddress
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .insert([orderPayload])
          .select()

        if (!error && data) {
          return { success: true, order: data[0] }
        }
      } catch (err) {
        console.error('Fallo guardando orden en Supabase:', err)
      }
    }

    try {
      const orders = JSON.parse(localStorage.getItem('dreams_dn_orders') || '[]')
      orders.unshift(orderPayload)
      localStorage.setItem('dreams_dn_orders', JSON.stringify(orders))
    } catch (e) {
      console.error('Error guardando orden local:', e)
    }

    return { success: true, order: orderPayload }
  }
}
