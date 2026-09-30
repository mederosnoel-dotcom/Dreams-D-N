import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { INITIAL_PRODUCTS } from '../data/mockProducts'

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
          .order('featured', { ascending: false })

        if (error) {
          console.warn('Error al consultar Supabase, utilizando datos locales:', error.message)
          return this.getLocalProducts()
        }

        if (data && data.length > 0) {
          // Adaptar formato si es necesario
          return data.map(item => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : [item.image_url],
            materials: Array.isArray(item.materials) ? item.materials : ['Oro 18K', 'Oro Blanco 18K'],
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
   * Obtiene productos de respaldo locales y guardados en el navegador
   */
  getLocalProducts() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)
      if (stored) {
        const custom = JSON.parse(stored)
        return [...INITIAL_PRODUCTS, ...custom]
      }
    } catch (e) {
      console.error('Error leyendo productos locales:', e)
    }
    return INITIAL_PRODUCTS
  },

  /**
   * Guarda una orden de compra en Supabase o en el registro local
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
        console.warn('No se pudo guardar la orden en Supabase, guardando en local:', error?.message)
      } catch (err) {
        console.error('Fallo guardando orden en Supabase:', err)
      }
    }

    // Guardar en historial local del cliente
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
