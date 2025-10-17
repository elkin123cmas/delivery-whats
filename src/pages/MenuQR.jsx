// src/pages/MenuQR.jsx
import React, { useMemo, useState } from "react";
import { PRODUCTS, CONFIG } from "../config";
import { Link } from "react-router-dom";
import ProductDetailModal from "../components/ProductDetailModal";
import { Search } from "lucide-react"; // ícono de lupa pro

export default function MenuQR() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [dark, setDark] = useState(true); // modo oscuro por defecto
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = useMemo(() => {
    const cats = [
      ...new Set((PRODUCTS || []).map((p) => p.category || "Sin categoría")),
    ];
    return cats;
  }, []);

  const visibleProducts = useMemo(() => {
  return (PRODUCTS || []).filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase()) ||
      p.defaultIngredients?.some((ing) =>
        ing.toLowerCase().includes(query.toLowerCase())
      );

    // Si el usuario está escribiendo algo, ignoramos la categoría
    if (query.trim() !== "") {
      return matchesQuery;
    }

    // Si no hay búsqueda, aplicamos categoría normalmente
    return activeCategory ? p.category === activeCategory : true;
  });
}, [query, activeCategory]);


  return (
    <div
      className={
        dark
          ? "min-h-screen bg-slate-900 text-white"
          : "min-h-screen bg-gray-100 text-slate-900"
      }
    >
      {/* Top bar */}
      <header
        className={`py-4 px-4 sticky top-0 z-20 ${
          dark
            ? "backdrop-blur-md bg-slate-900/60 border-b border-slate-800/40"
            : "bg-gray-200 border-b border-gray-300"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{CONFIG.logo}</div>
            <div>
              <h1 className="text-xl font-bold">{CONFIG.restaurantName}</h1>
              <p className="text-sm text-slate-400 hidden sm:block">
                {CONFIG.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className={`px-3 py-2 rounded-full text-sm font-medium border transition ${
                dark
                  ? "border-slate-700/40 hover:bg-slate-800"
                  : "border-gray-400 hover:bg-gray-300"
              }`}
            >
              {dark ? "🌙 Oscuro" : "☀️ Claro"}
            </button>

            <Link
              to="/"
              className="text-sm underline hidden sm:inline hover:text-amber-500 transition"
            >
              Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {/* 🔍 Buscador */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-1/2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar un plato..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none text-sm transition ${
                dark
                  ? "bg-slate-800 border border-slate-700/50 focus:border-amber-400"
                  : "bg-white border border-gray-300 focus:border-amber-500"
              }`}
            />
          </div>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory((prev) => (prev === cat ? null : cat))
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-amber-400 text-black"
                    : dark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-gray-200 hover:bg-gray-300 text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Productos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.length === 0 ? (
            <div className="col-span-full text-center text-slate-400 py-20">
              No encontramos platos — intenta otra búsqueda.
            </div>
          ) : (
            visibleProducts.map((p) => (
              <article
                key={p.id}
                className={`rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.02] ${
                  dark
                    ? "bg-slate-800/60 border border-slate-700/30"
                    : "bg-white border border-slate-200"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <p
                        className={`text-sm mt-1 ${
                          dark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {p.description || p.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 font-bold">
                        {CONFIG.currency}
                        {p.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400 mt-2">
                        {p.category}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-slate-300 flex items-center gap-2 flex-wrap">
                    {Array.isArray(p.defaultIngredients) &&
                      p.defaultIngredients.length > 0 && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            dark
                              ? "bg-slate-700/40"
                              : "bg-gray-200 text-slate-700"
                          }`}
                        >
                          Ingredientes:{" "}
                          {p.defaultIngredients.slice(0, 3).join(", ")}
                          {p.defaultIngredients.length > 3 ? "…" : ""}
                        </span>
                      )}
                  </div>

                  {/* Botón que abre el modal */}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 text-sm px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-slate-400">
        {CONFIG.restaurantName} — Menú digital QR • {new Date().getFullYear()}
      </footer>

      {/* Modal */}
      <ProductDetailModal
        isOpen={!!selectedProduct}
        producto={selectedProduct}
        dark={dark}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
