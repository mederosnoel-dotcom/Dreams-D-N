// Catálogo para DREAMS D&N
// Por solicitud del usuario, el catálogo inicia vacío para que solo se muestren los productos introducidos por el propietario.

export const INITIAL_PRODUCTS = [];

// Catálogo de respaldo opcional (por si el usuario desea cargar ejemplos en algún momento)
export const SAMPLE_PRODUCTS = [
  {
    id: "sample-1",
    name: "Anillo Solitario 'Eternal Dream'",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 3250000,
    originalPrice: 3800000,
    featured: true,
    rating: 5.0,
    reviewCount: 42,
    shortDescription: "Diamante corte brillante de 1.2 quilates engastado en oro blanco de 18k.",
    description: "La cumbre de la alta joyería artesanal. El anillo Solitario Eternal Dream de DREAMS D&N celebra los momentos más trascendentales con un diamante certificado por la GIA de claridad VVS1, engastado en cuatro garras pulidas a mano.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Blanco 18K", "Oro Amarillo 18K", "Oro Rosa 18K"],
    sizes: ["5", "6", "6.5", "7", "7.5", "8"],
    stock: 5,
    tag: "Más Vendido",
    specs: {
      metal: "Oro Blanco de 18k (750 milésimas)",
      gem: "Diamante natural certificado GIA (1.2 ct, Color F, VVS1)",
      weight: "4.8 gramos",
      guarantee: "Certificado GIA y Garantía Vitalicia"
    }
  },
  {
    id: "sample-2",
    name: "Gargantilla 'Lágrima Imperial' con Zafiro",
    category: "collares",
    categoryLabel: "Collares",
    price: 2890000,
    originalPrice: 3200000,
    featured: true,
    rating: 5.0,
    reviewCount: 28,
    shortDescription: "Zafiro azul profundo de corte pera rodeado de un halo de diamantes naturales.",
    description: "Inspirada en la elegancia de la realeza moderna, esta gargantilla suspende una majestuosa gema de zafiro de Ceilán corte gota de 2.0 quilates. Su halo en oro blanco de 18k realza el fuego y la luminiscencia celestial de la joya.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Blanco 18K", "Oro Amarillo 18K"],
    sizes: ["40 cm", "45 cm", "50 cm"],
    stock: 3,
    tag: "Edición Limitada",
    specs: {
      metal: "Oro Blanco 18K",
      gem: "Zafiro Azul Real 2.0 ct + Halo de Diamantes (0.35 ct)",
      weight: "6.2 gramos",
      guarantee: "Certificado de Gemología DREAMS D&N"
    }
  }
];

export const CATEGORIES = [
  { id: "todos", label: "Todas las Joyas", icon: "Sparkles" },
  { id: "anillos", label: "Anillos", icon: "CircleDot" },
  { id: "collares", label: "Collares", icon: "Gem" },
  { id: "pulseras", label: "Pulseras", icon: "Watch" },
  { id: "aretes", label: "Aretes", icon: "Flame" }
];
