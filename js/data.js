const categorias = [
  { id: "notebooks", nombre: "Notebooks" },
  { id: "perifericos", nombre: "Periféricos" },
  { id: "componentes", nombre: "Componentes" },
  { id: "monitores", nombre: "Monitores" }
];

const productos = [
  {
    id: 1,
    nombre: "Notebook Gamer RTX 4060",
    categoria: "notebooks",
    precio: 990000,
    precioOferta: 890000,
    stock: 5,
    descripcion: "Notebook de alto rendimiento con Intel i7 y 16GB RAM.",
    imagen: "https://via.placeholder.com/300x200?text=Notebook+Gamer",
    destacado: true
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico 16000 DPI",
    categoria: "perifericos",
    precio: 35000,
    precioOferta: null,
    stock: 0, 
    descripcion: "Mouse ergonómico con sensor óptico de alta precisión.",
    imagen: "https://via.placeholder.com/300x200?text=Mouse+Gamer",
    destacado: false
  },
  {
    id: 3,
    nombre: "Teclado Mecánico RGB Switch Red",
    categoria: "perifericos",
    precio: 65000,
    precioOferta: 55000,
    stock: 12,
    descripcion: "Teclado mecánico retroiluminado compacto.",
    imagen: "https://via.placeholder.com/300x200?text=Teclado+Mecanico",
    destacado: true
  },
  {
    id: 4,
    nombre: "Monitor 144Hz 1ms Full HD",
    categoria: "monitores",
    precio: 180000,
    precioOferta: null,
    stock: 3,
    descripcion: "Monitor de 24 pulgadas especial para eSports.",
    imagen: "https://via.placeholder.com/300x200?text=Monitor+144Hz",
    destacado: true
  }
];

const cupones = [
  { codigo: "GAMER10", porcentaje: 10, tope: 20000, activo: true },
  { codigo: "PROMO2026", porcentaje: 15, tope: 30000, activo: true }
];