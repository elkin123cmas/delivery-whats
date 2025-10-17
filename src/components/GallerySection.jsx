import React, { useState } from "react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Imágenes de ejemplo (puedes reemplazar con tus propias URLs)
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      title: "Aniversario María & Carlos",
      description: "Celebrando 10 años de amor 💕",
      category: "Aniversario"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      title: "Cumpleaños de Sofía",
      description: "¡15 años inolvidables! 🎂",
      category: "Cumpleaños"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      title: "Reunión Familiar González",
      description: "Momentos que perduran 👨‍👩‍👧‍👦",
      category: "Familiar"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      title: "Cena Romántica",
      description: "La noche perfecta para dos 🌹",
      category: "Romántico"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      title: "Graduación Laura",
      description: "¡Lo logramos! 🎓",
      category: "Celebración"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&q=80",
      title: "Amigos Forever",
      description: "Brindando por la amistad 🍻",
      category: "Amigos"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
      title: "Pedida de Mano",
      description: "Ella dijo que sí 💍",
      category: "Romántico"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
      title: "Baby Shower",
      description: "Esperando a nuestro angelito 👶",
      category: "Familiar"
    }
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const scrollToReservas = () => {
    const reservasSection = document.getElementById('reservas');
    if (reservasSection) {
      reservasSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-white mt-20 px-4">
      {/* Header de la sección */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Momentos Inolvidables
            </span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded"></div>
        </div>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Celebra tus fechas especiales con nosotros. Cada momento merece ser recordado 
          en el lugar perfecto ✨
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["💑 Aniversarios", "🎂 Cumpleaños", "👨‍👩‍👧‍👦 Familiares", "🎉 Celebraciones"].map((tag) => (
            <span 
              key={tag}
              className="px-4 py-2 bg-slate-800/60 border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300 hover:bg-slate-700/60 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Grid de galería */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleImageClick(image)}
          >
            {/* Imagen */}
            <div className="aspect-square overflow-hidden bg-slate-800">
              <img
                src={image.url}
                alt={image.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  hoveredIndex === index ? "scale-110 brightness-75" : "scale-100"
                }`}
              />
            </div>

            {/* Overlay con información */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 transition-all duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="transform transition-all duration-300" style={{
                transform: hoveredIndex === index ? "translateY(0)" : "translateY(20px)"
              }}>
                <span className="inline-block px-2 py-1 bg-purple-500/80 rounded-full text-xs font-semibold mb-2">
                  {image.category}
                </span>
                <h3 className="font-bold text-white text-lg mb-1">{image.title}</h3>
                <p className="text-slate-200 text-sm">{image.description}</p>
              </div>
            </div>

            {/* Efecto de brillo en hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-pink-500/20 to-orange-500/0 transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Icono de zoom */}
            <div
              className={`absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/40 rounded-2xl p-8 text-center border border-purple-500/20 backdrop-blur-sm">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          ¿Listo para crear tu propia historia?
        </h3>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Reserva ahora y haz de tu celebración un momento mágico que recordarás para siempre
        </p>
        <button 
          onClick={scrollToReservas}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
        >
          ¡Reserva tu fecha especial! 🎉
        </button>
      </div>

      {/* Modal de imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition text-4xl font-bold z-10"
            >
              ✕
            </button>

            {/* Contenedor de imagen */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Info de la imagen */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300 mb-3">
                      {selectedImage.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-slate-300 text-lg">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}