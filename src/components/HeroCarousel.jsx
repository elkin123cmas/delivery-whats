import React, { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Configura tus eventos/promociones aquí
  // const slides = [
  //   {
  //     id: 1,
  //     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
  //     title: "🎉 Gran Inauguración",
  //     subtitle: "¡Celebra con nosotros!",
  //     description: "50% de descuento en todas las hamburguesas este fin de semana",
  //     badge: "NUEVO",
  //     ctaText: "Ver Menú",
  //     gradient: "from-orange-600/90 via-red-600/80 to-pink-600/90"
  //   },
  //   {
  //     id: 2,
  //     image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
  //     title: "🍕 Noche de Pizza",
  //     subtitle: "Todos los viernes",
  //     description: "2x1 en pizzas familiares + bebida gratis",
  //     badge: "PROMO",
  //     ctaText: "Ordenar Ahora",
  //     gradient: "from-yellow-600/90 via-orange-600/80 to-red-600/90"
  //   },
  //   {
  //     id: 3,
  //     image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1200&q=80",
  //     title: "💑 Cenas Románticas",
  //     subtitle: "Reserva tu mesa especial",
  //     description: "Ambiente único para parejas con música en vivo",
  //     badge: "ESPECIAL",
  //     ctaText: "Reservar Mesa",
  //     gradient: "from-purple-600/90 via-pink-600/80 to-red-600/90"
  //   }
  // ];

  const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1665401015549-712c0dc5ef85?w=1200&q=80", // filete de pescado
    title: "🎉 Gran Inauguración",
    subtitle: "¡Celebra con nosotros!",
    description: "50% de descuento en todos los platos de mariscos este fin de semana",
    badge: "NUEVO",
    ctaText: "Ver Menú",
    gradient: "from-blue-600/90 via-cyan-600/80 to-teal-600/90"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=1200&q=80", // camarones y prawns
    title: "🦐 Noche de Mariscos",
    subtitle: "Todos los viernes",
    description: "2x1 en cazuelas de mariscos + bebida refrescante gratis",
    badge: "PROMO",
    ctaText: "Ordenar Ahora",
    gradient: "from-teal-600/90 via-blue-500/80 to-indigo-600/90"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?w=1200&q=80", // langostinos al ajillo
    title: "💑 Cena Romántica en la Playa",
    subtitle: "Reserva tu mesa especial",
    description: "Disfruta de langostinos y ceviche frente al mar con música en vivo",
    badge: "ESPECIAL",
    ctaText: "Reservar Mesa",
    gradient: "from-purple-600/90 via-pink-500/80 to-indigo-600/90"
  }
];


  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Reactiva después de 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const scrollToMenu = () => {
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-950 mb-8">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/40" />
              {/* Gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            </div>

            {/* Contenido */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                {/* Badge */}
                <div className="inline-block">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-sm tracking-wider shadow-lg animate-pulse">
                    {slide.badge}
                  </span>
                </div>

                {/* Título */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  {slide.title}
                </h1>

                {/* Subtítulo */}
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 drop-shadow-lg">
                  {slide.subtitle}
                </h2>

                {/* Descripción */}
                <p className="text-lg md:text-xl text-white/90 font-medium max-w-xl drop-shadow-md">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={scrollToMenu}
                    className="group px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/50 flex items-center gap-2"
                  >
                    <span>{slide.ctaText}</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      const reservasSection = document.getElementById('reservas');
                      if (reservasSection) {
                        reservasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Reservar Mesa
                  </button>
                </div>
              </div>
            </div>

            {/* Decoración: Partículas flotantes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all z-10 group border border-white/20"
        aria-label="Slide anterior"
      >
        <svg
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all z-10 group border border-white/20"
        aria-label="Slide siguiente"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicador de auto-play */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white/20 flex items-center gap-2"
        >
          {isAutoPlaying ? (
            <>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Auto
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              Manual
            </>
          )}
        </button>
      </div>

      {/* Efecto de vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-slate-950/50" />
    </div>
  );
}