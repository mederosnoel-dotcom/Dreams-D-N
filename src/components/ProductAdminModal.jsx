import React, { useState } from 'react'
import {
  X, Plus, Trash2, Edit3, Image as ImageIcon, Camera, Upload,
  Sparkles, Check, AlertCircle, Layers, Tag, DollarSign, Shield
} from 'lucide-react'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'

export const ProductAdminModal = ({ isOpen, onClose, onProductsUpdated, editingProduct, setEditingProduct }) => {
  if (!isOpen) return null

  const { formatPrice, showToast } = useCart()
  const [activeTab, setActiveTab] = useState(editingProduct ? 'form' : 'form') // 'form' | 'list'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    id: editingProduct?.id || '',
    name: editingProduct?.name || '',
    category: editingProduct?.category || 'anillos',
    categoryLabel: editingProduct?.categoryLabel || 'Anillos',
    price: editingProduct?.price || '',
    originalPrice: editingProduct?.originalPrice || '',
    shortDescription: editingProduct?.shortDescription || '',
    description: editingProduct?.description || '',
    images: editingProduct?.images || [],
    materials: editingProduct?.materials || ['Plata Ley 925', 'Plata Rodinada'],
    sizes: editingProduct?.sizes || ['6', '7', '8'],
    stock: editingProduct?.stock || 5,
    tag: editingProduct?.tag || 'Plata Ley 925',
    specs: editingProduct?.specs || {
      metal: 'Plata Esterlina Ley 925',
      gem: 'Circones Cúbicos / Piedras Naturales',
      weight: '4.8 gramos',
      guarantee: 'Certificado de Plata 925 & Garantía Vitalicia'
    }
  })

  const [imageUrlInput, setImageUrlInput] = useState('')
  const [newMaterialInput, setNewMaterialInput] = useState('')
  const [newSizeInput, setNewSizeInput] = useState('')

  // Manejar subida de foto desde celular o computador
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        // Redimensionar para optimizar peso en móvil
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 1000
        const MAX_HEIGHT = 1000
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82)
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, compressedDataUrl]
        }))
        showToast('Foto cargada correctamente')
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  // Agregar imagen por URL
  const handleAddImageUrl = (e) => {
    e.preventDefault()
    if (!imageUrlInput.trim()) return
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }))
    setImageUrlInput('')
  }

  // Eliminar imagen
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Materiales
  const handleAddMaterial = (e) => {
    e.preventDefault()
    if (!newMaterialInput.trim()) return
    if (!formData.materials.includes(newMaterialInput.trim())) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterialInput.trim()]
      }))
    }
    setNewMaterialInput('')
  }

  const handleRemoveMaterial = (mat) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== mat)
    }))
  }

  // Tallas
  const handleAddSize = (e) => {
    e.preventDefault()
    if (!newSizeInput.trim()) return
    if (!formData.sizes.includes(newSizeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSizeInput.trim()]
      }))
    }
    setNewSizeInput('')
  }

  const handleRemoveSize = (sz) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== sz)
    }))
  }

  // Guardar Joya
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.name.trim()) {
      setErrorMsg('Debes ingresar el nombre de la joya.')
      return
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setErrorMsg('Ingresa un precio válido.')
      return
    }

    if (formData.images.length === 0) {
      setErrorMsg('Debes agregar al menos una foto (desde tu celular o por enlace).')
      return
    }

    setIsSubmitting(true)
    try {
      // Ajustar etiqueta de categoría
      const catLabels = {
        anillos: 'Anillos',
        collares: 'Collares',
        pulseras: 'Pulseras',
        aretes: 'Aretes',
        diamantes: 'Diamantes',
        otros: 'Joyería Fina'
      }

      const productPayload = {
        ...formData,
        categoryLabel: catLabels[formData.category] || 'Joya en Plata',
        shortDescription: formData.shortDescription || `${formData.name} forjado artesanalmente en ${formData.materials[0] || 'plata esterlina ley 925'}.`,
        description: formData.description || `Pieza única en auténtica plata esterlina ley 925 de la colección DREAMS D&N. Diseñada con extrema precisión y brillo deslumbrante.`
      }

      await productService.saveProduct(productPayload)
      showToast(formData.id ? '¡Joya actualizada con éxito!' : '¡Joya agregada a tu catálogo!')
      setIsSubmitting(false)
      if (setEditingProduct) setEditingProduct(null)
      onProductsUpdated()
      onClose()
    } catch (err) {
      setIsSubmitting(false)
      setErrorMsg('Error al guardar el producto. Intenta nuevamente.')
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#11131c] border border-[#2c3042] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#0e1017] border-b border-[#232733] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-slate-300" />
            <h3 className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide">
              {editingProduct ? 'Editar Joya' : 'Publicar Nueva Joya en Plata 925'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* 1. Datos Básicos */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-slate-300" />
                1. Información Principal
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-gray-300 mb-1">Nombre de la Joya *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Anillo Solitario 'Luz de Plata' Ley 925 con Circones"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    <option value="anillos">Anillos</option>
                    <option value="collares">Collares</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="aretes">Aretes</option>
                    <option value="otros">Otros / Colección Especial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Insignia / Etiqueta</label>
                  <input
                    type="text"
                    placeholder="Ej: Más Vendido, Exclusivo, Nuevo..."
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Precio de Venta ($ COP) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    placeholder="Ej: 2500000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Precio Original o Anterior (Tachado, opcional)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Ej: 3000000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Piezas en Stock Disponible</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white font-mono focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Fotos de la Joya */}
            <div className="space-y-3 pt-3 border-t border-[#232733]">
              <h4 className="font-semibold text-[#e5c378] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#d4af37]" />
                2. Fotos de la Joya ({formData.images.length} cargadas)
              </h4>

              {/* Botón de subida de archivo para móvil y PC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-4 rounded-xl border-2 border-dashed border-[#d4af37]/40 hover:border-[#d4af37] bg-[#161824] hover:bg-[#1a1c2b] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-white text-center">
                    Tomar foto o subir de la galería
                  </span>
                  <span className="text-[10px] text-gray-400 text-center">
                    Directo desde tu cámara o archivos (JPG, PNG, WebP)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Opción de agregar por enlace web */}
                <div className="p-4 rounded-xl bg-[#161824] border border-gray-800 flex flex-col justify-center gap-2">
                  <span className="text-gray-300 font-medium">O pegar enlace de foto web:</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/joya.jpg"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#0e1017] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 rounded-lg bg-[#242838] hover:bg-[#2e344a] text-white font-medium shrink-0"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>

              {/* Previsualización de Fotos Cargadas */}
              {formData.images.length > 0 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden bg-black border border-[#2b2f3e] shrink-0 group">
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 right-1 text-center bg-black/70 text-[9px] text-[#e5c378] font-bold rounded">
                          Portada
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-80 hover:opacity-100 transition-opacity"
                        title="Eliminar foto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Características y Variantes */}
            <div className="space-y-3 pt-3 border-t border-[#232733]">
              <h4 className="font-semibold text-[#e5c378] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                3. Características, Metales y Medidas
              </h4>

              {/* Metales */}
              <div>
                <label className="block text-gray-300 mb-1">Metales / Materiales Disponibles</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.materials.map(mat => (
                    <span key={mat} className="px-2.5 py-1 rounded-lg bg-[#1a1c28] border border-gray-700 text-gray-200 flex items-center gap-1.5 text-[11px]">
                      <span>{mat}</span>
                      <button type="button" onClick={() => handleRemoveMaterial(mat)} className="text-gray-400 hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nuevo metal (ej: Plata Italiana 925, Plata Rodinada, Plata Bali...)"
                    value={newMaterialInput}
                    onChange={(e) => setNewMaterialInput(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[#161824] border border-gray-800 text-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="px-3 py-1.5 rounded-lg bg-[#202330] hover:bg-[#2b3042] text-gray-200 font-medium"
                  >
                    + Agregar Metal
                  </button>
                </div>
              </div>

              {/* Tallas */}
              <div>
                <label className="block text-gray-300 mb-1">Tallas / Medidas Disponibles</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.sizes.map(sz => (
                    <span key={sz} className="px-2.5 py-1 rounded-lg bg-[#1a1c28] border border-gray-700 text-gray-200 flex items-center gap-1.5 text-[11px]">
                      <span>{sz}</span>
                      <button type="button" onClick={() => handleRemoveSize(sz)} className="text-gray-400 hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nueva medida (ej: 6, 7, 45cm, Estándar...)"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-[#161824] border border-gray-800 text-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-1.5 rounded-lg bg-[#202330] hover:bg-[#2b3042] text-gray-200 font-medium"
                  >
                    + Agregar Talla
                  </button>
                </div>
              </div>

              {/* Ficha técnica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-gray-400 mb-1">Metal & Ley</label>
                  <input
                    type="text"
                    value={formData.specs.metal}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, metal: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-[#161824] border border-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Gema / Piedra Preciosa</label>
                  <input
                    type="text"
                    value={formData.specs.gem}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, gem: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-[#161824] border border-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Peso Estimado</label>
                  <input
                    type="text"
                    value={formData.specs.weight}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, weight: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-[#161824] border border-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Garantía & Certificado</label>
                  <input
                    type="text"
                    value={formData.specs.guarantee}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, guarantee: e.target.value } })}
                    className="w-full p-2 rounded-lg bg-[#161824] border border-gray-800 text-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. Descripciones */}
            <div className="space-y-3 pt-3 border-t border-[#232733]">
              <div>
                <label className="block text-gray-300 mb-1">Descripción Breve (visible en la tarjeta)</label>
                <input
                  type="text"
                  placeholder="Ej: Diamante corte brillante engastado en oro blanco de 18k."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Descripción Completa y Detalles de la Joya</label>
                <textarea
                  rows={3}
                  placeholder="Escribe la historia, el acabado, y los detalles únicos de esta joya..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#161824] border border-gray-800 text-white placeholder-gray-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#232733] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : (editingProduct ? 'Guardar Cambios' : 'Publicar Joya')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
