-- ====================================================================
-- DREAMS D&N | ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Alta Joyería & Comercio Electrónico
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
  materials TEXT[] DEFAULT ARRAY['Oro 18K'],
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

-- Permitir a los clientes anónimos crear órdenes de compra
CREATE POLICY "Creación pública de órdenes de compra" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- 5. DATOS SEMILLA INICIALES (CATÁLOGO DREAMS D&N)
INSERT INTO public.products (
  id, name, category, categoryLabel, price, originalPrice, featured, rating, reviewCount, shortDescription, description, images, materials, sizes, stock, tag, specs
) VALUES 
(
  'prod-1',
  'Anillo Solitario ''Eternal Dream''',
  'anillos',
  'Anillos',
  3250000,
  3800000,
  true,
  4.9,
  42,
  'Diamante corte brillante de 1.2 quilates engastado en oro blanco de 18k.',
  'La cumbre de la alta joyería artesanal. El anillo Solitario Eternal Dream de DREAMS D&N celebra los momentos más trascendentales con un diamante certificado por la GIA.',
  ARRAY[
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80'
  ],
  ARRAY['Oro Blanco 18K', 'Oro Amarillo 18K', 'Oro Rosa 18K'],
  ARRAY['5', '6', '6.5', '7', '7.5', '8'],
  5,
  'Más Vendido',
  '{"metal": "Oro Blanco 18k", "gem": "Diamante GIA 1.2 ct", "weight": "4.8g", "guarantee": "Vitalicia"}'::jsonb
),
(
  'prod-2',
  'Gargantilla ''Lágrima Imperial'' con Zafiro',
  'collares',
  'Collares',
  2890000,
  3200000,
  true,
  5.0,
  28,
  'Zafiro azul profundo de corte pera rodeado de un halo de diamantes naturales.',
  'Inspirada en la elegancia de la realeza moderna, esta gargantilla suspende una majestuosa gema de zafiro de Ceilán corte gota de 2.0 quilates.',
  ARRAY[
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
  ],
  ARRAY['Oro Blanco 18K', 'Oro Amarillo 18K'],
  ARRAY['40 cm', '45 cm', '50 cm'],
  3,
  'Edición Limitada',
  '{"metal": "Oro Blanco 18K", "gem": "Zafiro Ceilán 2.0 ct", "weight": "6.2g", "guarantee": "Certificado DREAMS D&N"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
