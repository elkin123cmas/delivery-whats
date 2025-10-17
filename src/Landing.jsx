// src/App.jsx
import React, { useState } from "react";
import { CONFIG, PRODUCTS } from "./config";
import ReservaSection from "./components/ReservaSection";
import ProductModal from "./components/ProductModal";
import CartModal from "./components/CartModal";
import "./index.css";
import GallerySection from "./components/GallerySection";
import HeroCarousel from "./components/HeroCarousel";

export default function App() {
  // Carrito y modales
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // Filtros / menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // null = todas
  const [categorySearch, setCategorySearch] = useState("");

  // Categorías únicas
  const categories = [...new Set((PRODUCTS || []).map((p) => p.category))];

  // ======= Funciones carrito =======
  const addToCart = (
    product,
    removedIngredients = [],
    selectedExtras = [],
    quantity = 1
  ) => {
    const cartItem = {
      ...product,
      removedIngredients,
      selectedExtras,
      quantity,
      uniqueId: Date.now() + Math.random(),
    };
    setCart((c) => [...c, cartItem]);
    setSelectedProduct(null);
    setShowCart(true);
  };

  const removeFromCart = (uniqueId) => {
    setCart((c) => c.filter((item) => item.uniqueId !== uniqueId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const extrasTotal = (item.selectedExtras || []).reduce(
        (sum, e) => sum + (e.price || 0),
        0
      );
      return total + (item.price + extrasTotal) * item.quantity;
    }, 0);
  };

  // ======= Enviar por WhatsApp =======
  const sendToWhatsApp = (
    paymentMethod,
    customerName,
    customerPhone,
    customerAddress
  ) => {
    let message = `🍔 *NUEVO PEDIDO - ${CONFIG.restaurantName}*\n\n`;
    message += `👤 *DATOS DEL CLIENTE*\n`;
    message += `Nombre: ${customerName}\n`;
    message += `Teléfono: ${customerPhone}\n`;
    if (CONFIG.delivery && customerAddress)
      message += `📍 Dirección: ${customerAddress}\n`;
    message += `\n🛒 *PEDIDO*\n`;

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* (x${item.quantity})\n`;
      message += `   💰 ${CONFIG.currency}${item.price.toLocaleString()}\n`;

      if (item.removedIngredients && item.removedIngredients.length > 0) {
        message += `   ❌ Sin: ${item.removedIngredients.join(", ")}\n`;
      }

      if (item.selectedExtras && item.selectedExtras.length > 0) {
        message += `   ➕ Extras:\n`;
        item.selectedExtras.forEach((extra) => {
          message += `      • ${extra.name} (+${
            CONFIG.currency
          }${extra.price.toLocaleString()})\n`;
        });
      }
      message += `\n`;
    });

    const subtotal = calculateTotal();
    message += `💵 *Subtotal:* ${
      CONFIG.currency
    }${subtotal.toLocaleString()}\n`;

    if (CONFIG.delivery) {
      message += `🛵 *Domicilio:* ${
        CONFIG.currency
      }${CONFIG.deliveryCost.toLocaleString()}\n`;
      message += `💳 *TOTAL:* ${CONFIG.currency}${(
        subtotal + CONFIG.deliveryCost
      ).toLocaleString()}\n`;
    } else {
      message += `💳 *TOTAL:* ${CONFIG.currency}${subtotal.toLocaleString()}\n`;
    }

    message += `\n💰 *Método de pago:* ${paymentMethod}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Categorías visibles segun filtro
  const visibleCategories = activeCategory ? [activeCategory] : categories;

  // ======= Render =======
  return (
    <div className="min-h-screen pb-24 bg-slate-900">
      {/* HEADER */}
      <div className="header-glass sticky top-0 z-40 shadow-3xl">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 py-2 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-sm text-white gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span>📍</span>
                <span className="hidden sm:inline">{CONFIG.address}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🕒</span>
                <span className="hidden md:inline">{CONFIG.schedule}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                className="p-2 rounded-md hover:bg-white/10 transition flex items-center gap-2 text-white"
                title="Filtrar por categoría"
              >
                {!menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <span className="hidden sm:inline">Categorías</span>
              </button>

              <a
                href={`tel:${CONFIG.phone}`}
                className="flex items-center gap-1 hover:text-orange-200 transition text-white"
              >
                <span>📞</span>
                <span>{CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 px-4 backdrop-blur-md bg-slate-900/60 border-b border-slate-800/50 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl float-animation">{CONFIG.logo}</div>
              <div>
                <h1 className="text-3xl md:text-4xl text-white font-bold gradient-text">
                  {CONFIG.restaurantName}
                </h1>
                <p className="text-slate-400 mt-1">{CONFIG.tagline}</p>
              </div>
            </div>

            {CONFIG.delivery && (
              <div className="hidden md:flex items-center gap-2 badge px-4 py-2 rounded-full text-white font-semibold">
                <span>🛵</span>
                <span>Delivery disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* PANEL DESPLEGABLE DE CATEGORÍAS */}
        <div
          className={`fixed top-20 right-4 z-50 w-80 max-w-[90vw] transform transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-10px] pointer-events-none"
          }`}
        >
          <div className="bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg">Filtrar categorías</h4>
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setCategorySearch("");
                }}
                className="text-sm text-slate-300 hover:text-white"
              >
                Limpiar
              </button>
            </div>

            <input
              type="search"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              placeholder="Buscar categoría..."
              className="w-full p-2 rounded-md bg-slate-800 border border-slate-700 mb-3"
            />

            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-md transition ${
                  activeCategory === null
                    ? "bg-cyan-600 text-black font-semibold"
                    : "hover:bg-slate-800"
                }`}
              >
                Todas{" "}
                <span className="text-sm text-slate-300 ml-2">
                  ({(PRODUCTS || []).length})
                </span>
              </button>

              {categories
                .filter((c) =>
                  c.toLowerCase().includes(categorySearch.toLowerCase())
                )
                .map((cat) => {
                  const count = (PRODUCTS || []).filter(
                    (p) => p.category === cat
                  ).length;
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${
                        active
                          ? "bg-cyan-600 text-black font-semibold"
                          : "hover:bg-slate-800"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-sm text-slate-300"> {count} </span>
                    </button>
                  );
                })}
            </div>

            <div className="mt-3 text-xs text-slate-400">
              Tip: usa la búsqueda si tienes muchas categorías.
            </div>
          </div>
        </div>
      </div>

      <HeroCarousel/>

      {/* ========== MENÚ DE PRODUCTOS ========== */}
      <div className="max-w-6xl mx-auto p-4">
        {visibleCategories.map((category) => (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              <h2 className="text-3xl font-bold text-white">{category}</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-red-500 to-transparent rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 product-grid">
              {(PRODUCTS || [])
                .filter((p) => p.category === category)
                .map((product) => (
                  <div
                    key={product.id}
                    className="product-card rounded-xl overflow-hidden cursor-pointer card-glow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                        {CONFIG.currency}
                        {product.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl text-white mb-2">
                        {product.name}
                      </h3>
                      <button className="w-full mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
                        Ver opciones ✨
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Reservas */}
      <div id="reservas">
        <ReservaSection />
      </div>

      {/* Sección de Galleria */}
      <GallerySection />

      {/* Modal Producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
          currency={CONFIG.currency}
        />
      )}

      {/* Botón flotante carrito */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="whatsapp-float fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-full shadow-2xl hover:from-green-600 hover:to-green-700 transition-all z-50 transform hover:scale-110"
        >
          <span className="text-3xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
            {cart.length}
          </span>
        </button>
      )}

      {/* Modal Carrito */}
      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onSend={sendToWhatsApp}
          total={calculateTotal()}
          currency={CONFIG.currency}
          delivery={CONFIG.delivery}
          deliveryCost={CONFIG.deliveryCost}
        />
      )}
    </div>
  );
}
