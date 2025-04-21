import { Link } from 'react-router-dom';

export default function Home() {
  const banners = [
    {
      id: 1,
      title: "Colección de Verano",
      subtitle: "Estilos brillantes para días soleados",
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      link: "/products?collection=summer",
      bgClass: "bg-amber-100" // Tailwind amarillo-100
    },
    {
      id: 2,
      title: "Edición Limitada",
      subtitle: "Diseños exclusivos solo para ti",
      imageUrl: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      link: "/products?collection=limited",
      bgClass: "bg-emerald-100" // Tailwind verde-100
    },
    {
      id: 3,
      title: "Ofertas Especiales",
      subtitle: "Hasta 50% de descuento esta semana",
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      link: "/products?discount=true",
      bgClass: "bg-rose-100" // Tailwind rojo-100
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-text-base">
      {/* Sección Principal */}
      <section className="flex items-center justify-center py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Boutique de Nani</h1>
          <h2 className="text-2xl md:text-4xl mb-8">Estilos de Nueva Temporada</h2>
          <p className="text-xl mb-12">Descubre las últimas tendencias</p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-text-base px-10 py-4 rounded-full font-bold hover:bg-pink-300 hover:text-white transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* Banners Promocionales */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Colecciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {banners.map((banner) => (
              <div key={banner.id} className={`${banner.bgClass} rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden`}>
                <div className="h-64 overflow-hidden">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="mb-6">{banner.subtitle}</p>
                  <Link
                    to={banner.link}
                    className="inline-block border-1 bg-white px-6 py-2 rounded-lg font-medium hover:bg-pink-200 hover:text-white transition-colors"
                  >
                    Explorar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propuestas de Valor */}
      <section className="bg-purple-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-4">Envío Gratis</h3>
            <p>En todos los pedidos superiores a $100</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🕛</div>
            <h3 className="text-xl font-bold mb-4">Reserva Prendas</h3>
            <p>Política sin complicaciones de 10 días</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-4">Pago Seguro</h3>
            <p>Transacciones 100% protegidas</p>
          </div>
        </div>
      </section>
    </div>
  );
}