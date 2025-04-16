import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-white shadow-md py-4 px-6 sticky top-0 z-10 text-white bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          ✨ Nani's Boutique✨
        </Link>
        <nav className="flex gap-8 text-sm font-semibold">
          <Link
            to="/new-arrivals"
            className="hover:text-amber-200 transition-colors"
          >
            Novedades
          </Link>
          <Link
            to="/collections"
            className="hover:text-amber-200 transition-colors"
          >
            Colecciones
          </Link>
          <Link
            to="/account"
            className="hover:text-amber-200 transition-colors"
          >
            Mi Cuenta
          </Link>
          <Link
            to="/cart"
            className="relative hover:text-amber-200 transition-colors"
          >
            Carrito{" "}
            <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-amber-300 text-purple-700 rounded-full px-1 text-xs font-bold"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
