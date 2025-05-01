
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Login  from './pages/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow container mx-auto py-8 px-4">
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/collection" />
              <Route element={<ProtectedRoute/>}>
                <Route path="/product" element={<ProductManagement/>} />
              </Route>
          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
