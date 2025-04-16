import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Acerca de nosotros</h3>
            <p className="text-gray-300">
            Donde la moda se encuentra con tu estilo. Explora nuestra colección de ropa y accesorios.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces</h3>
            <ul className="space-y-2 flex flex-col">
              <Link
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                
              </Link>
              <Link
                  to="/products" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
              </Link>
              <Link
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
              </Link>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contaco</h3>
            <address className="not-italic text-gray-300">
              <p>Rumichaca ñan y S41</p>
              <p>Quito, Ecuador</p>
              <p><b>Correo</b>: nanyboutique@gmail.com</p>
              <p><b>Número</b>: (593) 63362854</p>
            </address>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {currentYear} TecSolutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}