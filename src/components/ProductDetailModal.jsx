import React from "react";

const ProductDetailModal = ({ isOpen, onClose, producto, dark }) => {
  if (!isOpen) return null;

  const textColor = dark ? "text-white" : "text-gray-800";
  const bgColor = dark ? "bg-slate-800" : "bg-white";
  const borderColor = dark ? "border-slate-700" : "border-gray-300";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className={`${bgColor} w-[90%] max-w-md rounded-2xl shadow-xl flex flex-col max-h-[85vh] ${textColor} ${borderColor}`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-4 border-b ${borderColor}`}
        >
          <h2 className="text-lg font-semibold">
            {producto?.name || "Detalle del producto"}
          </h2>
          <button
            onClick={onClose}
            className={`text-xl font-bold ${
              dark
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            ×
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto p-4 space-y-4">
          <div className="flex justify-center">
            <img
              src={producto?.image || "https://via.placeholder.com/300"}
              alt={producto?.name}
              className="w-[300px] rounded-lg object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
              🧂 Ingredientes
              <span className="flex-1 h-px bg-slate-700/50"></span>
            </h3>

            {producto?.defaultIngredients?.length ? (
              <ul className="space-y-2">
                {producto.defaultIngredients.map((ing, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 bg-slate-800/60 rounded-lg text-slate-300 text-sm border border-slate-700/30 hover:bg-slate-700/50 transition"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 italic text-sm">
                No hay ingredientes registrados.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
              📝 Descripción
              <span className="flex-1 h-px bg-slate-700/50"></span>
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/60 border border-slate-700/30 rounded-lg p-3 shadow-inner">
              {producto?.description || "Sin descripción disponible."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 flex justify-end ${borderColor}`}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
