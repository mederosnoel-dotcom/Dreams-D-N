import React, { useState } from 'react'
import { X, Database, Check, Copy, ExternalLink, ShieldCheck, Terminal, Layers } from 'lucide-react'
import { isSupabaseConfigured, getSupabaseStatus } from '../lib/supabase'

export const SupabaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [copied, setCopied] = useState(false)
  const status = getSupabaseStatus()

  const sqlSchema = `-- ==========================================
-- DREAMS D&N - SQL SCHEMA PARA SUPABASE
-- ==========================================

-- 1. Tabla de Productos de Joyería
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  categoryLabel TEXT NOT NULL,
  price NUMERIC NOT NULL,
  originalPrice NUMERIC,
  featured BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 5.0,
  reviewCount INTEGER DEFAULT 0,
  shortDescription TEXT,
  description TEXT,
  images TEXT[] NOT NULL,
  materials TEXT[] DEFAULT ARRAY['Oro 18K'],
  sizes TEXT[] DEFAULT ARRAY['Estándar'],
  stock INTEGER DEFAULT 1,
  tag TEXT,
  specs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Órdenes de Compra
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer JSONB NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  subtotal NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  payment_method JSONB NOT NULL,
  payment_status TEXT DEFAULT 'approved',
  shipping_address TEXT NOT NULL
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acceso:
-- Cualquiera puede leer el catálogo de productos:
CREATE POLICY "Lectura pública de catálogo" 
ON public.products FOR SELECT USING (true);

-- Cualquiera puede crear una orden de compra:
CREATE POLICY "Creación pública de órdenes" 
ON public.orders FOR INSERT WITH CHECK (true);`

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#12141d] border border-[#2a2d3e] rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#0e1017] border-b border-[#232733] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide">
              Integración de Base de Datos • Supabase
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* Status Box */}
          <div className="p-4 rounded-2xl bg-[#171a26] border border-[#272b3b] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Estado de Conexión:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {status.mode}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              La aplicación está programada con arquitectura desacoplada: funciona de forma autónoma con datos locales y se sincroniza en vivo en cuanto configures tus credenciales de Supabase en el archivo <code className="bg-black/40 text-[#e5c378] px-1 py-0.5 rounded font-mono">.env</code>.
            </p>
          </div>

          {/* Quick Steps Guide */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#d4af37]" />
              Pasos para conectar tu proyecto de Supabase en 2 minutos:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-[#151722] border border-[#222533]">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold flex items-center justify-center mb-1.5">1</span>
                <p className="font-semibold text-white mb-0.5">Crear Proyecto</p>
                <p className="text-[10px] text-gray-400">En supabase.com crea un nuevo proyecto gratuito.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#151722] border border-[#222533]">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold flex items-center justify-center mb-1.5">2</span>
                <p className="font-semibold text-white mb-0.5">Pegar SQL</p>
                <p className="text-[10px] text-gray-400">Copia el esquema de abajo y ejecútalo en el SQL Editor de Supabase.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#151722] border border-[#222533]">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold flex items-center justify-center mb-1.5">3</span>
                <p className="font-semibold text-white mb-0.5">Agregar .env</p>
                <p className="text-[10px] text-gray-400">Pega tus variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.</p>
              </div>
            </div>
          </div>

          {/* SQL Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#d4af37]" />
                Script SQL Listo para Copiar:
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#202434] hover:bg-[#2b3147] text-white font-medium border border-gray-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-[#090a0f] border border-[#202330] text-[#a5b4fc] font-mono text-[10px] sm:text-[11px] overflow-x-auto max-h-56 leading-relaxed">
              {sqlSchema}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e1017] border-t border-[#232733] flex justify-between items-center">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
          >
            <span>Ir a Supabase.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl gold-gradient-bg text-[#0b0c10] font-bold text-xs uppercase tracking-wider"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
