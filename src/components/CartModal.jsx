import React, { useState } from "react";

export default function CartModal({ cart, onClose, onRemove, onSend, total, currency, delivery, deliveryCost }) {
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!customerPhone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (customerPhone.length < 10) {
      newErrors.phone = "El teléfono debe tener al menos 10 dígitos";
    }

    if (delivery && !customerAddress.trim()) {
      newErrors.address = "La dirección es obligatoria para el domicilio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (validateForm()) {
      onSend(paymentMethod, customerName, customerPhone, customerAddress);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">🛒 Tu Pedido</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl transition">×</button>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍔</div>
              <p className="text-slate-400 text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.uniqueId} className="border border-slate-700 rounded-xl p-4 bg-slate-700/50 hover:bg-slate-700 transition">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-white text-lg">
                        {item.name} <span className="text-orange-500">(x{item.quantity})</span>
                      </h3>
                      <button onClick={() => onRemove(item.uniqueId)} className="text-red-500 hover:text-red-400 font-bold text-xl transition">✕</button>
                    </div>

                    {item.removedIngredients && item.removedIngredients.length > 0 && (
                      <p className="text-sm text-red-400 mb-1">❌ Sin: {item.removedIngredients.join(", ")}</p>
                    )}

                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <p className="text-sm text-green-400 mb-2">➕ Extras: {item.selectedExtras.map((e) => e.name).join(", ")}</p>
                    )}

                    <p className="text-orange-500 font-bold text-lg">
                      {currency}{((item.price + (item.selectedExtras || []).reduce((s, e) => s + (e.price || 0), 0)) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6 bg-slate-700/30 p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                  <span>👤</span>
                  <span>Datos de contacto</span>
                </h3>

                <div className="mb-4">
                  <label className="block text-slate-300 mb-2 text-sm font-semibold">Nombre completo *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition ${errors.name ? "border-2 border-red-500" : "border border-slate-600"}`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">⚠️ {errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-slate-300 mb-2 text-sm font-semibold">Teléfono *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Ej: 3123456789"
                    className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition ${errors.phone ? "border-2 border-red-500" : "border border-slate-600"}`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">⚠️ {errors.phone}</p>}
                </div>

                {delivery && (
                  <div className="mb-4">
                    <label className="block text-slate-300 mb-2 text-sm font-semibold">Dirección de entrega *</label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Ej: Calle 123 #45-67, Apto 101, Barrio Centro"
                      rows="3"
                      className={`w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition resize-none ${errors.address ? "border-2 border-red-500" : "border border-slate-600"}`}
                    />
                    {errors.address && <p className="text-red-400 text-sm mt-1">⚠️ {errors.address}</p>}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
                  <span>💳</span>
                  <span>Método de pago</span>
                </h3>
                <div className="space-y-2">
                  {["Efectivo", "Transferencia", "Tarjeta", "Nequi", "Daviplata"].map((method) => (
                    <label key={method} className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700 p-3 rounded-lg transition">
                      <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="w-5 h-5 text-orange-500 bg-slate-700 border-slate-600 focus:ring-orange-500" />
                      <span className="text-slate-300">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-3 bg-slate-700/30 p-4 rounded-xl">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{currency}{total.toLocaleString()}</span>
                </div>

                {delivery && (
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1"><span>🛵</span><span>Domicilio:</span></span>
                    <span className="font-semibold">{currency}{deliveryCost.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-2xl font-bold text-white pt-3 border-t border-slate-600">
                  <span>Total:</span>
                  <span className="text-orange-500">{currency}{(total + (delivery ? deliveryCost : 0)).toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handleSend} className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-xl transition-all">
                <span>📱</span>
                <span>Enviar pedido por WhatsApp</span>
              </button>

              <button onClick={onClose} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-lg transition-all">
                <span>🍔</span>
                <span>Seguir pidiendo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
