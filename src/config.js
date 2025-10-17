// 🔥 CONFIGURACIÓN DEL RESTAURANTE
// Cambia estos datos para cada cliente

export const CONFIG = {
    restaurantName: "El Sabor del Mar",
    tagline: "El verdadero sabor del caribe 🐟",
    logo: "🐟", // Puedes usar emoji o URL de imagen
    whatsappNumber: "573182251737", // Sin + ni espacios
    phone: "+57 318 225 1737", // Para mostrar
    address: "Calle 4 #6-60, Buga",
    schedule: "Lun - Dom: 11:00 AM - 8:00 PM",
    currency: "$",
    delivery: true,
    deliveryCost: 3000,
};

// 🍔 PRODUCTOS DEL MENÚ
// Añade, edita o elimina productos según necesites

// export const PRODUCTS = [
//   // 🍔 HAMBURGUESAS
//   {
//     id: 1,
//     name: "Hamburguesa Clásica",
//     price: 15000,
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
//     category: "Hamburguesas",
//     defaultIngredients: ["Carne", "Lechuga", "Tomate", "Cebolla", "Queso", "Salsa de tomate", "Mayonesa"],
//     extras: [
//       { name: "Carne extra", price: 5000 },
//       { name: "Queso extra", price: 2000 },
//       { name: "Tocineta", price: 3000 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Hamburguesa BBQ",
//     price: 18000,
//     image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
//     category: "Hamburguesas",
//     defaultIngredients: ["Carne", "Lechuga", "Tomate", "Cebolla caramelizada", "Queso cheddar", "Salsa BBQ"],
//     extras: [
//       { name: "Carne extra", price: 5000 },
//       { name: "Aros de cebolla", price: 3000 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Hamburguesa de Pollo",
//     price: 16000,
//     image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
//     category: "Hamburguesas",
//     defaultIngredients: ["Pollo empanizado", "Lechuga", "Tomate", "Queso", "Mayonesa"],
//     extras: [
//       { name: "Pollo extra", price: 4000 },
//       { name: "Queso extra", price: 2000 },
//     ],
//   },

//   // 🌭 PERROS CALIENTES
//   {
//     id: 8,
//     name: "Perro Americano",
//     price: 12000,
//     image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdCUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=80&w=500",
//     category: "Perros Calientes",
//     defaultIngredients: ["Salchicha americana", "Pan", "Papas ripiadas", "Queso", "Salsas"],
//     extras: [
//       { name: "Tocineta", price: 2000 },
//       { name: "Queso extra", price: 1500 },
//     ],
//   },
//   {
//     id: 9,
//     name: "Perro Mexicano",
//     price: 14000,
//     image: "https://images.unsplash.com/photo-1641246630294-c48c8aec58fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90JTIwZG9nJTIwbWV4aWNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=500",
//     category: "Perros Calientes",
//     defaultIngredients: ["Salchicha", "Guacamole", "Jalapeños", "Queso", "Salsa BBQ"],
//     extras: [
//       { name: "Jalapeños extra", price: 1000 },
//       { name: "Guacamole extra", price: 2000 },
//     ],
//   },

//   // 🍕 PIZZAS
//   {
//     id: 10,
//     name: "Pizza Pepperoni",
//     price: 25000,
//     image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500",
//     category: "Pizzas",
//     defaultIngredients: ["Masa artesanal", "Salsa napolitana", "Queso mozzarella", "Pepperoni"],
//     extras: [
//       { name: "Extra Queso", price: 3000 },
//       { name: "Borde de queso", price: 3500 },
//     ],
//   },
//   {
//     id: 11,
//     name: "Pizza Hawaiana",
//     price: 24000,
//     image: "https://images.unsplash.com/photo-1613160774588-d8ac9ad7eded?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpenphJTIwaGF3YWluYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=500",
//     category: "Pizzas",
//     defaultIngredients: ["Jamón", "Piña", "Queso mozzarella", "Salsa napolitana"],
//     extras: [
//       { name: "Piña extra", price: 1000 },
//       { name: "Borde relleno", price: 3500 },
//     ],
//   },

//   // 🍟 ACOMPAÑAMIENTOS
//   {
//     id: 4,
//     name: "Papas Fritas",
//     price: 6000,
//     image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
//     category: "Acompañamientos",
//     defaultIngredients: [],
//     extras: [
//       { name: "Queso cheddar", price: 2000 },
//       { name: "Tocineta", price: 2500 },
//     ],
//   },
//   {
//     id: 5,
//     name: "Aros de Cebolla",
//     price: 7000,
//     image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500",
//     category: "Acompañamientos",
//     defaultIngredients: [],
//     extras: [{ name: "Salsa ranch", price: 1000 }],
//   },

//   // 🍨 POSTRES
//   {
//     id: 12,
//     name: "Brownie con Helado",
//     price: 10000,
//     image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnJvd25pZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=500",
//     category: "Postres",
//     defaultIngredients: ["Brownie", "Helado de vainilla", "Sirope de chocolate"],
//     extras: [
//       { name: "Extra helado", price: 2000 },
//       { name: "Chispas de chocolate", price: 1500 },
//     ],
//   },
//   {
//     id: 13,
//     name: "Cheesecake de Fresa",
//     price: 9500,
//     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
//     category: "Postres",
//     defaultIngredients: ["Queso crema", "Base de galleta", "Mermelada de fresa"],
//     extras: [{ name: "Extra mermelada", price: 1000 }],
//   },

//   // 🥤 BEBIDAS
//   {
//     id: 6,
//     name: "Coca-Cola",
//     price: 3000,
//     image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
//     category: "Bebidas",
//     defaultIngredients: [],
//     extras: [],
//   },
//   {
//     id: 7,
//     name: "Sprite",
//     price: 3000,
//     image: "https://images.unsplash.com/photo-1696706980174-79c1c11aa683?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwcml0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=500",
//     category: "Bebidas",
//     defaultIngredients: [],
//     extras: [],
//   },
//   {
//     id: 14,
//     name: "Limonada Natural",
//     price: 4000,
//     image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
//     category: "Bebidas",
//     defaultIngredients: [],
//     extras: [],
//   },
//   {
//     id: 15,
//     name: "Malteada de Chocolate",
//     price: 7000,
//     image: "https://plus.unsplash.com/premium_photo-1667544654787-cd984212004d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbHRlYWRhfGVufDB8fDB8fHww&auto=format&fit=crop&q=80&w=500",
//     category: "Bebidas",
//     defaultIngredients: ["Helado", "Leche", "Chocolate"],
//     extras: [{ name: "Crema batida", price: 1000 }],
//   },

//   // 🍔 COMBOS
//   {
//     id: 16,
//     name: "Combo Clásico",
//     price: 20000,
//     image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500",
//     category: "Combos",
//     defaultIngredients: ["Hamburguesa Clásica", "Papas Fritas", "Coca-Cola"],
//     extras: [{ name: "Salsa adicional", price: 500 }],
//   },
//   {
//     id: 17,
//     name: "Combo Familiar",
//     price: 55000,
//     image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFtaWx5JTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=500",
//     category: "Combos",
//     defaultIngredients: ["2 Hamburguesas", "1 Pizza", "2 Gaseosas", "Papas Fritas grandes"],
//     extras: [{ name: "Postre adicional", price: 6000 }],
//   },
// ];

export const PRODUCTS = [
  // 🐟 PESCADOS
  {
    id: 1,
    name: "Filete de Pescado",
    price: 20000,
    image: "https://images.unsplash.com/photo-1665401015549-712c0dc5ef85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZWQlMjBmaXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    category: "Pescados",
    defaultIngredients: ["Filete fresco", "Limón", "Especias"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
      { name: "Porción de patacón", price: 2000 },
      { name: "Ensalada", price: 2500 },
      { name: "Patacón con hogao", price: 3000 },
    ],
  },

  // 🦐 ESPECIALIDADES
  {
    id: 2,
    name: "Cazuela de Mariscos",
    price: 45000,
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJhd25zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    category: "Especialidades",
    defaultIngredients: ["Camarones", "Calamares", "Mejillones", "Salsa criolla"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
    ],
  },
  {
    id: 3,
    name: "Langostinos al Ajillo",
    price: 40000,
    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByYXduc3xlbnwwfHwwfHx8MA==&auto=format&fit=crop&q=60&w=500",
    category: "Especialidades",
    defaultIngredients: ["Langostinos", "Ajo", "Aceite de oliva", "Limón"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
    ],
  },
  {
    id: 4,
    name: "Langostinos Apanados",
    price: 42000,
    image: "https://images.unsplash.com/photo-1599655345131-6eb73b81d8d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNocmltcHxlbnwwfHwwfHx8MA==&auto=format&fit=crop&q=60&w=500",
    category: "Especialidades",
    defaultIngredients: ["Langostinos", "Pan rallado", "Aceite", "Salsa tártara"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
    ],
  },
  {
    id: 5,
    name: "Camarones Sudados",
    price: 43000,
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJhd25zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    category: "Especialidades",
    defaultIngredients: ["Camarones", "Tomate", "Cebolla", "Ajo", "Especias"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
    ],
  },

  // 🍗 OTROS
  {
    id: 6,
    name: "Filete de Pollo",
    price: 18000,
    image: "https://images.unsplash.com/photo-1500040760498-8be2dccbdea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Otros",
    defaultIngredients: ["Pechuga de pollo", "Especias", "Aceite"],
    extras: [
      { name: "Porción de arroz blanco", price: 3000 },
      { name: "Porción de arroz coco", price: 4000 },
      { name: "Porción de patacón", price: 2000 },
      { name: "Ensalada", price: 2500 },
    ],
  },

  // 🍚 ARROCES
  {
    id: 7,
    name: "Arroz con Camarón",
    price: 22000,
    image: "https://images.unsplash.com/photo-1710963049272-eac1c7964e1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Arroces",
    defaultIngredients: ["Arroz", "Camarón", "Verduras", "Especias"],
    extras: [
      { name: "Porción de patacón", price: 2000 },
      { name: "Ensalada", price: 2500 },
    ],
  },
  {
    id: 8,
    name: "Arroz Coco con Camarones",
    price: 23000,
    image: "https://plus.unsplash.com/premium_photo-1694462932014-36b551a28609?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Arroces",
    defaultIngredients: ["Arroz de coco", "Camarones", "Especias"],
    extras: [
      { name: "Porción de patacón", price: 2000 },
      { name: "Ensalada", price: 2500 },
    ],
  },
  {
    id: 9,
    name: "Arroz a la Marinera",
    price: 25000,
    image: "https://plus.unsplash.com/premium_photo-1689596510351-e246d2fd7bae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsYWRzfGVufDB8fDB8fHww?auto=format&fit=crop&q=60&w=500",
    category: "Arroces",
    defaultIngredients: ["Arroz", "Mariscos mixtos", "Salsa criolla", "Especias"],
    extras: [
      { name: "Porción de patacón", price: 2000 },
      { name: "Ensalada", price: 2500 },
    ],
  },

  // 🥤 BEBIDAS
  {
    id: 10,
    name: "Coca-Cola",
    price: 3000,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
    category: "Bebidas",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 11,
    name: "Limonada Natural",
    price: 4000,
    image: "https://plus.unsplash.com/premium_photo-1714245922334-7af56ed94910?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJpZWQlMjBiYW5hbmF8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Bebidas",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 12,
    name: "Malteada de Chocolate",
    price: 7000,
    image: "https://images.unsplash.com/photo-1500040760498-8be2dccbdea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Bebidas",
    defaultIngredients: ["Helado", "Leche", "Chocolate"],
    extras: [{ name: "Crema batida", price: 1000 }],
  },

  // 🍚 ADICIONALES
  {
    id: 13,
    name: "Porción de Arroz Blanco",
    price: 3000,
    image: "https://images.unsplash.com/photo-1500040760498-8be2dccbdea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Adicionales",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 14,
    name: "Porción de Arroz Coco",
    price: 4000,
    image: "https://images.unsplash.com/photo-1500040760498-8be2dccbdea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Adicionales",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 15,
    name: "Porción de Patacón",
    price: 2000,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGZpbGxldHxlbnwwfHwwfHx8MA==&auto=format&fit=crop&q=60&w=500",
    category: "Adicionales",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 16,
    name: "Ensalada",
    price: 2500,
    image: "https://images.unsplash.com/photo-1500040760498-8be2dccbdea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZSUyMHdpdGglMjBzaHJpbXB8ZW58MHx8MHx8fDA=?auto=format&fit=crop&q=60&w=500",
    category: "Adicionales",
    defaultIngredients: [],
    extras: [],
  },
  {
    id: 17,
    name: "Patacón con Hogao",
    price: 3000,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGZpbGxldHxlbnwwfHwwfHx8MA==&auto=format&fit=crop&q=60&w=500",
    category: "Adicionales",
    defaultIngredients: [],
    extras: [],
  },
];


