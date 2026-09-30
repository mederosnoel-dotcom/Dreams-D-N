# 💎 DREAMS D&N — E-Commerce de Alta Joyería (Mobile-First)

Aplicación web de comercio electrónico de alta gama desarrollada para la marca de joyería **DREAMS D&N**. Diseñada bajo un enfoque estrictamente **Mobile-First**, con estética de lujo (oro de 18k, contrastes oscuros, tipografía serif editorial y destellos metálicos), catálogo interactivo, carrito dinámico, procesamiento seguro de pagos con tarjeta (Stripe / Mercado Pago) y arquitectura desacoplada lista para conectar con **Supabase**.

---

## 🌟 Características Principales

### 1. 📱 Diseño Mobile-First & Responsive de Lujo
- Optimizado para pantallas táctiles y visualización fluida desde cualquier celular o tablet.
- Tipografía editorial de lujo (`Cormorant Garamond` y `Montserrat`).
- Barra de categorías horizontales con scroll táctil continuo.
- Tarjetas de joyas con proporciones áureas (4:5), distintivos de metales y gemas, y zoom al interactuar.
- Botón flotante para atención y concierge directo por WhatsApp con un joyero maestro.

### 2. 💍 Catálogo y Experiencia de Compra
- **Galería de Joyas:** Filtros dinámicos por tipo (Anillos, Collares, Pulseras, Aretes), pureza del metal (Oro 18K, Oro Blanco, Oro Rosa) y ordenamiento por precio o recomendaciones.
- **Detalle de Joya (Bottom Sheet / Modal):** Galería con selector de miniaturas, selector de metal precioso, selector de talla con **Guía de Medición de Anillos** integrada, especificaciones técnicas (gramaje, quilates de diamante, certificación GIA) y botones de compra directa o cotización por WhatsApp.
- **Lista de Deseos (Wishlist):** Guardado persistente de joyas favoritas en el dispositivo.
- **Conversor Multidivisa en Tiempo Real:** Soporte para pesos colombianos (`COP`), dólares (`USD`), euros (`EUR`) y pesos mexicanos (`MXN`).

### 3. 🛍️ Carrito de Compras Dinámico
- Drawer deslizable optimizado para móviles.
- **Barra de Progreso de Envío Asegurado Gratis:** Notificación dinámica que indica cuánto falta para obtener envío blindado sin costo.
- Cupones de descuento automáticos (ej: `DREAMS10` para 10% de descuento o `VIP20`).
- Control de cantidades (+/-) y cálculo instantáneo de subtotal, descuentos, envío asegurado y total.

### 4. 💳 Procesamiento de Pagos Seguro (Stripe & Mercado Pago)
- **Previsualización de Tarjeta 3D en Tiempo Real:** Tarjeta virtual interactiva con chip dorado reflectivo, logotipo de marca (Visa, Mastercard, Amex), formateo automático de 16 dígitos y efecto de giro/foco para el CVV.
- **Validaciones Bancarias:** Verificación mediante el **Algoritmo de Luhn**, comprobación de fechas de caducidad y código de seguridad.
- Selector de cuotas (1, 3, 6 o 12 cuotas).
- Opciones de pago adicionales preparadas (PSE, Nequi, Daviplata, Transferencia bancaria).
- Pantalla de confirmación con **animación de confeti** (`canvas-confetti`), código de orden único (ej. `DN-84920`) y enlace directo para recibir guía de transporte blindado por WhatsApp.

### 5. 🗄️ Base de Datos Supabase (Desacoplada y Dinámica)
- Funciona inmediatamente en modo demostración local sin necesidad de configurar una base de datos externa.
- Conexión transparente con **Supabase** simplemente agregando las variables de entorno en `.env`.
- Incluye el archivo de migración SQL listo para ejecutar: `supabase-schema.sql` (con tablas `products` y `orders`, políticas RLS de seguridad y catálogo semilla).
- Modal interactivo dentro de la tienda para inspeccionar el estado de conexión y copiar el esquema SQL en un clic.

---

## 🛠️ Stack Tecnológico

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Efectos:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / Database:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Pasarelas de Pago:** Arquitectura lista para [Stripe](https://stripe.com/) y [Mercado Pago](https://www.mercadopago.com/)

---

## 🚀 Instalación y Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### Pasos

1. **Clonar o ingresar al proyecto:**
   ```bash
   cd dreams-dn-store
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre la URL indicada en tu navegador (usualmente `http://localhost:5173`).

---

## ⚡ Conectar con Supabase en 3 Pasos

1. Ve a [supabase.com](https://supabase.com/) y crea un nuevo proyecto gratuito.
2. En el panel izquierdo, abre **SQL Editor** y ejecuta el contenido del archivo [`supabase-schema.sql`](./supabase-schema.sql).
3. Crea un archivo `.env` en la raíz del proyecto tomando como plantilla `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://tu-id-de-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_publica_aqui
   ```
4. Reinicia el servidor con `npm run dev`. La tienda detectará automáticamente la conexión a Supabase y comenzará a sincronizar el catálogo y las órdenes en vivo.

---

## 💳 Despliegue en Producción (Vercel o Netlify)

El proyecto está listo para compilarse y desplegarse en segundos:

### Opción A: Despliegue en Vercel
1. Sube tu código a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: tienda oficial DREAMS D&N"
   git remote add origin https://github.com/tu-usuario/dreams-dn-store.git
   git push -u origin main
   ```
2. Entra a [vercel.com](https://vercel.com/) e importa tu repositorio de GitHub.
3. En la sección **Environment Variables**, agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. Haz clic en **Deploy**.

### Opción B: Despliegue en Netlify
1. Conecta tu repositorio de GitHub en [netlify.com](https://netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura las variables de entorno y presiona **Deploy site**.

---

## 📄 Estructura del Código

```text
dreams-dn-store/
├── index.html                   # HTML principal con Google Fonts y metas móviles
├── package.json                 # Dependencias y scripts
├── vite.config.js               # Configuración Vite + Tailwind CSS v4
├── supabase-schema.sql          # Script SQL para tablas y políticas RLS en Supabase
├── .env.example                 # Variables de entorno de ejemplo
├── src/
│   ├── main.jsx                 # Punto de entrada de React
│   ├── App.jsx                  # Componente raíz con orquestación de catálogo y modales
│   ├── index.css                # Estilos globales, paleta de oro y efectos de cristal
│   ├── components/
│   │   ├── Navbar.jsx           # Cabecera con selector de divisa, búsqueda, bolsa y logo
│   │   ├── HeroBanner.jsx       # Portada de lujo mobile-first con sellos de garantía
│   │   ├── CategoryFilter.jsx   # Chips táctiles para categorías, metales y ordenamiento
│   │   ├── ProductCard.jsx      # Tarjeta de producto con foto 4:5, rating y compra rápida
│   │   ├── ProductModal.jsx     # Ficha detallada con medidas, materiales y guía de tallas
│   │   ├── CartDrawer.jsx       # Carrito deslizable con barra de envío gratis y cupones
│   │   ├── CheckoutModal.jsx    # Checkout de tarjeta interactiva 3D, Luhn y pasarelas
│   │   ├── OrderSuccessModal.jsx# Confirmación de compra, confeti y seguimiento WhatsApp
│   │   ├── SupabaseModal.jsx    # Guía interactiva de conexión y visor de SQL
│   │   ├── FloatingWhatsApp.jsx # Asesoría en vivo con joyero por WhatsApp
│   │   └── Footer.jsx           # Pie de página editorial con garantías y métodos de pago
│   ├── context/
│   │   └── CartContext.jsx      # Estado global del carrito, divisas, cupones y favoritos
│   ├── data/
│   │   └── mockProducts.js      # Catálogo exclusivo con fotos de alta resolución
│   ├── lib/
│   │   └── supabase.js          # Cliente Supabase con detección de estado
│   └── services/
│       ├── productService.js    # Consultas al catálogo y registro de órdenes
│       └── paymentService.js    # Detección de tarjeta, validación Luhn y simulación Stripe/MP
```

---

*Diseñado para DREAMS D&N — Joyería Exclusiva de Alta Gama.*
