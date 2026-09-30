-- ====================================================================
-- DREAMS D&N | ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Joyería Fina de Plata & Comercio Electrónico
-- ====================================================================

-- 1. TABLA DE PRODUCTOS
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
  materials TEXT[] DEFAULT ARRAY['Plata Fina'],
  sizes TEXT[] DEFAULT ARRAY['Estándar'],
  stock INTEGER DEFAULT 1,
  tag TEXT,
  specs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA DE ÓRDENES DE COMPRA Y TRANSACCIONES
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

-- 3. HABILITAR SEGURIDAD POR FILA (ROW LEVEL SECURITY)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE ACCESO RLS
-- Permitir lectura anónima pública del catálogo
CREATE POLICY "Lectura pública de catálogo" 
ON public.products 
FOR SELECT 
USING (true);

-- Permitir creación anónima pública de órdenes de compra
CREATE POLICY "Creación pública de órdenes de compra" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);
