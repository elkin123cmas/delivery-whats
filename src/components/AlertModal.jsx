

export default function AlertModal({ title, msg, color, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className={`w-full max-w-md bg-slate-900 rounded-2xl p-6 border shadow-2xl border-${color}-500`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✖</button>
        </div>
        <p className="text-white">{msg}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
