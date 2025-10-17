import React, { useState, useEffect } from "react";

export default function ProductModal({ product, onClose, onAdd, currency }) {
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // defensas: si vienen undefined, convertir a arrays (con valores seguros por defecto)
  const defaultIngredients = Array.isArray(product?.defaultIngredients) ? product.defaultIngredients : [];
  const extras = Array.isArray(product?.extras) ? product.extras : [];

  useEffect(() => {
    // resetear estado cuando cambie el producto (evita mezclas si abres varios seguidos)
    if (product) {
      setRemovedIngredients([]);
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [product]);



  const toggleIngredient = (ingredient) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient]
    );
  };

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.name === extra.name) ? prev.filter((e) => e.name !== extra.name) : [...prev, extra]
    );
  };

  const calculatePrice = () => {
    const extrasTotal = (selectedExtras || []).reduce((sum, extra) => sum + (extra.price || 0), 0);
    return (product.price + extrasTotal) * quantity;
  };

    // Guard: si no hay product, no renderices nada - DESPUÉS de los hooks
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl transition">×</button>
        </div>

        <div className="p-6">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg" />

          {defaultIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
                <span>🥬</span>
                <span>Ingredientes (desmarca lo que no quieres)</span>
              </h3>
              <div className="space-y-2">
                {defaultIngredients.map((ingredient) => (
                  <label key={ingredient} className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700 p-3 rounded-lg transition">
                    <input
                      type="checkbox"
                      checked={!removedIngredients.includes(ingredient)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-slate-300">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {extras.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
                <span>➕</span>
                <span>Extras</span>
              </h3>
              <div className="space-y-2">
                {extras.map((extra) => (
                  <label key={extra.name} className="flex items-center justify-between cursor-pointer hover:bg-slate-700 p-3 rounded-lg transition">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.find((e) => e.name === extra.name) !== undefined}
                        onChange={() => toggleExtra(extra)}
                        className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-slate-300">{extra.name}</span>
                    </div>
                    <span className="text-orange-500 font-bold">
                      +{currency}{(extra.price || 0).toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
              <span>🔢</span>
              <span>Cantidad</span>
            </h3>
            <div className="flex items-center justify-center space-x-6 bg-slate-700 p-4 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-slate-600 hover:bg-slate-500 w-12 h-12 rounded-full font-bold text-xl text-white transition shadow-lg">−</button>
              <span className="text-3xl font-bold text-white min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="bg-slate-600 hover:bg-slate-500 w-12 h-12 rounded-full font-bold text-xl text-white transition shadow-lg">+</button>
            </div>
          </div>

          <button
            onClick={() => onAdd(product, removedIngredients, selectedExtras, quantity)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all"
          >
            Añadir al carrito - {currency}{calculatePrice().toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
