import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10 bg-bg-base">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-text-base">
      <Link to="/" className="text-3xl font-bold hover:text-amber-500 transition-colors">
          ✨ Nani's Boutique✨
        </Link>
        <nav className="flex items-center gap-8 text-sm font-semibold">
          {user ? (`Bienvienid@ ${user.name}`):("")}
          {user?.role == "admin" ? (
            <Link
            to="/product"
            className="hover:text-amber-500"
          >
            Productos
          </Link>
          ):
          (
            <></>
          )}
          <Link
            to="/collections"
            className="hover:text-amber-500 transition-colors"
          >
            Colecciones
          </Link>
          {user ? (
              <div>
                <button
                  onClick={logout}
                  className="text-lg text-center hover:text-amber-500 hover:cursor-pointer"
                >
                  ➔|
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:text-amber-500"
              >
                Login
              </Link>
            )}
          <Link
            to="/cart"
            className="relative text-lg hover:text-amber-500 transition-colors"
          >
            🛒
            {/* Add a mock cart badge */}
            <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-amber-300 text-text-base rounded-full px-2 text-xs font-bold">
              3
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
