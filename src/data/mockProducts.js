// Catálogo exclusivo de joyería fina para DREAMS D&N
export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Anillo Solitario 'Eternal Dream'",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 3250000, // en COP (~$850 USD)
    originalPrice: 3800000,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    shortDescription: "Diamante corte brillante de 1.2 quilates engastado en oro blanco de 18k.",
    description: "La cumbre de la alta joyería artesanal. El anillo Solitario Eternal Dream de DREAMS D&N celebra los momentos más trascendentales con un diamante certificado por la GIA de claridad VVS1, engastado en cuatro garras pulidas a mano sobre una banda de oro blanco de 18 quilates con micro-pavé.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80"
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
    id: "prod-2",
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
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80"
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
  },
  {
    id: "prod-3",
    name: "Pulsera Tennis 'Constelación D&N'",
    category: "pulseras",
    categoryLabel: "Pulseras",
    price: 4600000,
    originalPrice: 5100000,
    featured: true,
    rating: 4.8,
    reviewCount: 35,
    shortDescription: "Línea continua de diamantes corte brillante montados en bisel de oro amarillo 18k.",
    description: "El clásico atemporal definitivo. Nuestra Pulsera Tennis Constelación presenta 55 diamantes redondos engarzados con extrema precisión para fluir con suavidad ergonómica sobre la muñeca. Incluye broche de seguridad doble oculto.",
    images: [
      "https://images.unsplash.com/photo-1611591475879-da0066ec65b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Amarillo 18K", "Oro Blanco 18K", "Platino 950"],
    sizes: ["16 cm", "17 cm", "18 cm", "19 cm"],
    stock: 4,
    tag: "Favorito D&N",
    specs: {
      metal: "Oro Amarillo 18K",
      gem: "55 Diamantes Naturales (Total 3.50 ct, Color G, Claridad VS)",
      weight: "11.5 gramos",
      guarantee: "Mantenimiento y pulido anual de cortesía"
    }
  },
  {
    id: "prod-4",
    name: "Aretes 'Cascada de Luz' Esmeralda Colombiana",
    category: "aretes",
    categoryLabel: "Aretes",
    price: 3790000,
    originalPrice: 4200000,
    featured: true,
    rating: 4.9,
    reviewCount: 19,
    shortDescription: "Auténticas esmeraldas colombianas de Muzo con pavé de diamantes en oro de 18k.",
    description: "Homenaje a las gemas más codiciadas del mundo. Aretes colgantes con dos esmeraldas colombianas de color verde intenso jardín 'Muzo', balanceadas con gotas de diamantes que bailan con la luz a cada paso.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Amarillo 18K", "Oro Blanco 18K"],
    sizes: ["Única (3.2 cm de caída)"],
    stock: 2,
    tag: "Esmeralda Muzo",
    specs: {
      metal: "Oro Amarillo 18K de alto brillo",
      gem: "Esmeraldas naturales colombianas 1.8 ct + Diamantes 0.40 ct",
      weight: "5.8 gramos el par",
      guarantee: "Certificado de Origen y Pureza"
    }
  },
  {
    id: "prod-5",
    name: "Anillo 'Corona Eterna' Pavé Infinito",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 1850000,
    originalPrice: 2100000,
    featured: false,
    rating: 4.7,
    reviewCount: 54,
    shortDescription: "Banda continua estilo eternity con micro-pavé de diamantes en oro rosa.",
    description: "Diseñado para apilar o lucir en solitaria elegancia. Su perfil curvo ultrafino asegura máximo confort diario sin sacrificar el fulgor continuo de 36 diamantes seleccionados a mano.",
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Rosa 18K", "Oro Amarillo 18K", "Oro Blanco 18K"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    stock: 8,
    tag: "Best Seller",
    specs: {
      metal: "Oro Rosa 18K",
      gem: "Diamantes corte redondo de 0.85 ct total",
      weight: "2.9 gramos",
      guarantee: "Garantía de engaste vitalicia"
    }
  },
  {
    id: "prod-6",
    name: "Collar 'Medallón Celestial' Perla Tahití",
    category: "collares",
    categoryLabel: "Collares",
    price: 2150000,
    originalPrice: 2450000,
    featured: false,
    rating: 5.0,
    reviewCount: 16,
    shortDescription: "Genuina perla negra de Tahití con copete de oro satinado y punto de diamante.",
    description: "Una perla cultivada en las aguas prístinas de la Polinesia Francesa, con destellos pavorreales tornasolados únicos en cada pieza. Suspendida en una fina cadena veneciana de oro de 18 quilates.",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Amarillo 18K", "Oro Blanco 18K"],
    sizes: ["45 cm (ajustable a 42 cm)"],
    stock: 6,
    tag: "Exclusivo",
    specs: {
      metal: "Oro Amarillo 18K",
      gem: "Perla negra de Tahití (10.5 mm) Grado AAA + Diamante 0.05 ct",
      weight: "5.4 gramos",
      guarantee: "Certificado de Autenticidad de Perlas Naturales"
    }
  },
  {
    id: "prod-7",
    name: "Brazalete Rígido 'Aura Dorada'",
    category: "pulseras",
    categoryLabel: "Pulseras",
    price: 3400000,
    originalPrice: 3900000,
    featured: false,
    rating: 4.8,
    reviewCount: 22,
    shortDescription: "Brazalete rígido articulado de oro macizo 18k con acabado cepillado y broche clic.",
    description: "Una oda a la orfebrería geométrica. Esculpido en oro macizo de 18k con un innovador sistema de apertura ergonómica con botón de resorte interno. Perfecto para combinar o ser la pieza protagonista de cualquier atuendo.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611591475879-da0066ec65b0?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Amarillo 18K", "Oro Rosa 18K"],
    sizes: ["S (15-16 cm)", "M (16.5-17.5 cm)", "L (18-19 cm)"],
    stock: 3,
    tag: "Alta Orfebrería",
    specs: {
      metal: "Oro Amarillo 18K macizo",
      gem: "N/A (Oro Pulido)",
      weight: "14.2 gramos",
      guarantee: "Sello de Pureza de Ley 750"
    }
  },
  {
    id: "prod-8",
    name: "Aretes Huggies 'Luz Estelar' en Diamantes",
    category: "aretes",
    categoryLabel: "Aretes",
    price: 1450000,
    originalPrice: 1650000,
    featured: false,
    rating: 4.9,
    reviewCount: 63,
    shortDescription: "Aros mini estilo huggie en oro blanco 18k con pavé frontal e interno de diamantes.",
    description: "Los aretes que nunca querrás quitarte. Diseñados con diamantes tanto en el frente exterior como en el interior visible, garantizando un brillo 360 grados continuo. Cierre seguro clic a presión.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80"
    ],
    materials: ["Oro Blanco 18K", "Oro Amarillo 18K", "Oro Rosa 18K"],
    sizes: ["Diámetro 11 mm", "Diámetro 14 mm"],
    stock: 9,
    tag: "Esencial Diario",
    specs: {
      metal: "Oro Blanco 18K",
      gem: "Diamantes corte redondo de 0.45 ct total (F-G, VS2)",
      weight: "3.1 gramos el par",
      guarantee: "Certificado DREAMS D&N"
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
