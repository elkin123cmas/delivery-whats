import React, { useState } from "react";
import AlertModal from "./AlertModal";

export default function ReservaSection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([2, 5, 9]);
  const [modal, setModal] = useState(null);
  const [decoracion, setDecoracion] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    telefono2: "",
    fecha: "",
    hora: "",
    personas: "",
    tematica: "",
  });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const rows = 3;
  const cols = 5;

  const handleSeatClick = (index) => {
    if (reservedSeats.includes(index)) {
      setModal("ocupado");
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "personas") newValue = value === "" ? "" : Number(value);
    setFormData((p) => ({ ...p, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.nombre || !formData.nombre.trim())
      newErrors.nombre = "Campo obligatorio";
    if (!formData.telefono || !formData.telefono.trim())
      newErrors.telefono = "Campo obligatorio";
    if (!formData.fecha) newErrors.fecha = "Campo obligatorio";
    if (!formData.hora) newErrors.hora = "Campo obligatorio";
    if (!formData.personas) newErrors.personas = "Campo obligatorio";
    if (!formData.tematica || !formData.tematica.trim())
      newErrors.tematica = "Campo obligatorio";
    return newErrors;
  };

  const sendReservaWhatsApp = () => {
    // Formatear la fecha de manera legible
    const fechaObj = new Date(formData.fecha);
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

    // Construir el mensaje
    let mensaje = `🎉 *NUEVA RESERVA DE MESA* 🎉\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    mensaje += `👤 *DATOS DEL CLIENTE*\n`;
    mensaje += `📝 Nombre: ${formData.nombre}\n`;
    mensaje += `📞 Teléfono: ${formData.telefono}\n`;
    if (formData.telefono2) {
      mensaje += `📱 Teléfono 2: ${formData.telefono2}\n`;
    }
    mensaje += `\n`;

    mensaje += `📅 *DETALLES DE LA RESERVA*\n`;
    mensaje += `🗓️ Fecha: ${fechaFormateada}\n`;
    mensaje += `🕐 Hora: ${formData.hora}\n`;
    mensaje += `👥 Personas: ${formData.personas}\n`;
    mensaje += `🎊 Temática: ${formData.tematica}\n`;
    mensaje += `\n`;

    mensaje += `🪑 *MESAS SELECCIONADAS*\n`;
    const mesasNumeros = selectedSeats.map(s => s + 1).sort((a, b) => a - b);
    mensaje += `Mesa(s): ${mesasNumeros.join(", ")}\n`;
    mensaje += `Total de mesas: ${selectedSeats.length}\n`;
    mensaje += `\n`;

    if (decoracion) {
      mensaje += `✨ *DECORACIÓN ESPECIAL*\n`;
      mensaje += `🎨 Decoración solicitada (+$20.000)\n`;
      mensaje += `\n`;
    }

    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `⚠️ *Por favor confirmar disponibilidad*`;

    // Codificar y enviar
    const whatsappNumber = "573182251737"; // Formato internacional sin +
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${whatsappNumber}?text=${mensajeCodificado}`;
    
    window.open(url, "_blank");
  };

  const validateAndSend = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const selectedDate = new Date(
      formData.fecha + "T" + (formData.hora || "00:00")
    );
    const now = new Date();
    const max = new Date(maxDateStr + "T23:59:59");

    if (selectedDate < now) return setModal("errorFechaPasada");
    if (selectedDate > max) return setModal("errorFechaMax");

    // Enviar por WhatsApp
    sendReservaWhatsApp();

    // Limpiar formulario y cerrar
    setReservedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setFormData({
      nombre: "",
      telefono: "",
      telefono2: "",
      fecha: "",
      hora: "",
      personas: "",
      tematica: "",
    });
    setDecoracion(false);
    setModal("ok");
  };

  const horasDisponibles = Array.from({ length: 14 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  return (
    <div className="max-w-6xl mx-auto text-white mt-16">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded"></div>
        <h2 className="text-3xl font-extrabold tracking-tight neon-text">
          Reserva tu mesa
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-transparent rounded"></div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-6 rounded-3xl shadow-2xl border border-cyan-800/30">
        <div className="flex justify-center mb-4">
          <div className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold shadow-[0_6px_20px_rgba(0,255,230,0.12)]">
            🚪 Entrada principal
          </div>
        </div>

        <div
          className="grid gap-4 justify-center mb-6"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(64px, 1fr))` }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const index = r * cols + c;
              const isReserved = reservedSeats.includes(index);
              const isSelected = selectedSeats.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => handleSeatClick(index)}
                  disabled={isReserved}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-lg font-bold transition-all select-none ${
                    isReserved
                      ? "bg-red-600 border-2 border-red-400 text-white cursor-not-allowed shadow-[0_0_18px_rgba(255,0,0,0.15)]"
                      : isSelected
                      ? "bg-emerald-400 text-black border-2 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.25)] transform scale-105"
                      : "bg-slate-800 hover:from-cyan-500 hover:to-blue-500 hover:bg-gradient-to-br border-2 border-slate-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-xs text-slate-400 font-medium">
                    Mesa
                  </span>
                  {index + 1}
                </button>
              );
            })
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-300">
            {selectedSeats.length > 0 ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Seleccionaste {selectedSeats.length} mesa
                {selectedSeats.length > 1 ? "s" : ""}
              </span>
            ) : (
              <span>Selecciona una mesa para reservar</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (selectedSeats.length === 0)
                  return setModal("seleccionVacia");
                setModal("form");
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold hover:scale-105 transition-shadow shadow-[0_8px_30px_rgba(14,165,233,0.18)]"
            >
              Reservar ahora
            </button>

            <button
              onClick={() => setSelectedSeats([])}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-700 transition"
            >
              Limpiar selección
            </button>
          </div>
        </div>
      </div>

      {/* Modal formulario */}
      {modal === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl p-6 border border-cyan-700/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Confirmar Reserva
              </h3>
              <button
                onClick={() => setModal(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✖
              </button>
            </div>

            <form onSubmit={validateAndSend} className="grid gap-3">
              {/* Nombre */}
              <div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo *"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.nombre ? "border-red-500" : "border-slate-700"
                  }`}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono principal *"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.telefono ? "border-red-500" : "border-slate-700"
                  }`}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                )}
              </div>

              {/* Teléfono 2 */}
              <div>
                <input
                  type="tel"
                  name="telefono2"
                  placeholder="Teléfono secundario (opcional)"
                  value={formData.telefono2}
                  onChange={handleChange}
                  className="p-3 w-full rounded-md bg-slate-800 text-white border border-slate-700"
                />
              </div>

              {/* Fecha */}
              <div>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  min={todayStr}
                  max={maxDateStr}
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.fecha ? "border-red-500" : "border-slate-700"
                  }`}
                />
                {errors.fecha && (
                  <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>
                )}
              </div>

              {/* Hora */}
              <div>
                <select
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.hora ? "border-red-500" : "border-slate-700"
                  }`}
                >
                  <option value="">Selecciona hora *</option>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.hora && (
                  <p className="text-red-500 text-sm mt-1">{errors.hora}</p>
                )}
              </div>

              {/* Personas */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-300">
                  Número de personas *
                </label>
                <input
                  type="number"
                  name="personas"
                  min="1"
                  max="20"
                  value={formData.personas}
                  onChange={handleChange}
                  placeholder="Ingrese el número de personas..."
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.personas ? "border-red-500" : "border-slate-700"
                  }`}
                />
                {errors.personas && (
                  <p className="text-red-500 text-sm mt-1">{errors.personas}</p>
                )}
              </div>

              {/* Temática */}
              <div>
                <input
                  type="text"
                  name="tematica"
                  placeholder="Temática (cumpleaños, romántica, etc.) *"
                  value={formData.tematica}
                  onChange={handleChange}
                  className={`p-3 w-full rounded-md bg-slate-800 text-white border ${
                    errors.tematica ? "border-red-500" : "border-slate-700"
                  }`}
                />
                {errors.tematica && (
                  <p className="text-red-500 text-sm mt-1">{errors.tematica}</p>
                )}
              </div>

              {/* Decoración */}
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white transition">
                <input
                  type="checkbox"
                  checked={decoracion}
                  onChange={() => setDecoracion((d) => !d)}
                  className="w-4 h-4"
                />
                <span>Con decoración especial ($20.000 adicionales)</span>
              </label>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-cyan-500 font-semibold text-black hover:scale-105 transition"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modales simples */}
      {modal === "ocupado" && (
        <AlertModal
          title="Mesa ocupada"
          msg="Esa mesa ya fue reservada."
          onClose={() => setModal(null)}
          color="red"
        />
      )}
      {modal === "seleccionVacia" && (
        <AlertModal
          title="Selecciona una mesa"
          msg="Debes elegir al menos una mesa."
          onClose={() => setModal(null)}
          color="yellow"
        />
      )}
      {modal === "ok" && (
        <AlertModal
          title="✅ Reserva confirmada"
          msg="Tu reserva fue enviada por WhatsApp. El restaurante te confirmará pronto."
          onClose={() => setModal(null)}
          color="emerald"
        />
      )}
      {modal === "errorFechaPasada" && (
        <AlertModal
          title="Fecha inválida"
          msg="No puedes reservar en una fecha pasada."
          onClose={() => setModal(null)}
          color="red"
        />
      )}
      {modal === "errorFechaMax" && (
        <AlertModal
          title="Fecha muy lejana"
          msg="Solo puedes reservar con hasta 15 días de anticipación."
          onClose={() => setModal(null)}
          color="yellow"
        />
      )}
    </div>
  );
}