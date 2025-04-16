
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage  from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow container mx-auto py-8 px-4">
          <Routes>
              <Route path="/" element={<HomePage/>} />
              
          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
