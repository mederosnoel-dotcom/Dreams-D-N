// Catálogo para DREAMS D&N — Joyería en Plata Esterlina Ley 925
// Por solicitud del usuario, el catálogo inicia vacío para que solo se muestren los productos introducidos por el propietario.

export const INITIAL_PRODUCTS = [];

// Catálogo de respaldo opcional en Plata Ley 925
export const SAMPLE_PRODUCTS = [
  {
    id: "sample-1",
    name: "Anillo Solitario 'Luz de Plata' Ley 925",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 185000,
    originalPrice: 220000,
    featured: true,
    rating: 5.0,
    reviewCount: 38,
    shortDescription: "Plata esterlina 925 italiana con circón suizo corte brillante y baño de rodio.",
    description: "Diseño clásico y deslumbrante elaborado en auténtica Plata Esterlina Ley 925 con acabado rodinado antideslustre. Engasta un circón suizo de máxima refracción.",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Plata Ley 925", "Plata Rodinada"],
    sizes: ["6", "6.5", "7", "7.5", "8"],
    stock: 6,
    tag: "Plata Ley 925",
    specs: {
      metal: "Plata Esterlina Ley 925 (Sello de Garantía)",
      gem: "Circón Suizo Grado AAA",
      weight: "3.8 gramos",
      guarantee: "Certificado de Plata 925 y Garantía de Brillo"
    }
  },
  {
    id: "sample-2",
    name: "Gargantilla 'Gota Celestial' en Plata 925",
    category: "collares",
    categoryLabel: "Collares",
    price: 195000,
    originalPrice: 240000,
    featured: true,
    rating: 5.0,
    reviewCount: 24,
    shortDescription: "Cadena veneciana en plata esterlina 925 con dije de zafiro azul creado y halo brillante.",
    description: "Elegancia atemporal forjada en plata de ley 925 con dije colgante estilo lágrima real. Acabado de espejo con protección antialérgica y libre de níquel.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Plata Ley 925", "Plata Rodinada"],
    sizes: ["40 cm", "45 cm", "50 cm"],
    stock: 4,
    tag: "Plata Italiana",
    specs: {
      metal: "Plata Ley 925 Italiana",
      gem: "Gema Zafiro Creado 1.5 ct + Circones",
      weight: "5.4 gramos",
      guarantee: "Sello 925 y Certificado DREAMS D&N"
    }
  }
];

export const CATEGORIES = [
  { id: "todos", label: "Toda la Plata", icon: "Sparkles" },
  { id: "anillos", label: "Anillos", icon: "CircleDot" },
  { id: "collares", label: "Cadenas & Dijes", icon: "Gem" },
  { id: "pulseras", label: "Pulseras & Manillas", icon: "Watch" },
  { id: "aretes", label: "Aretes & Candongas", icon: "Flame" }
];
