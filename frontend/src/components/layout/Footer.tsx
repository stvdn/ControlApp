import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-pink-200 to-purple-200 text-text-base py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Acerca de nosotros</h3>
            <p>
              Donde la moda se encuentra con tu estilo. Explora nuestra colección de ropa y accesorios.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces</h3>
            <ul className="space-y-2 flex flex-col">
              <Link
                to="/" 
                className="hover:text-amber-500 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products" 
                className="hover:text-amber-500 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/about" 
                className="hover:text-amber-500 transition-colors"
              >
                About
              </Link>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <address className="not-italic">
              <p>Rumichaca ñan y S41</p>
              <p>Quito, Ecuador</p>
              <p><b>Correo</b>: <a href="mailto:nanyboutique@gmail.com" className="text-text-base hover:text-amber-500 transition-colors">nanyboutique@gmail.com</a></p>
              <p><b>Número</b>: <a href="tel:+59363362854" className="text-text-base hover:text-amber-500 transition-colors">+593 63362854</a></p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-center">
          <p>© {currentYear} TECSolutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
