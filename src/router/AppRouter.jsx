import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Alta from '../pages/Alta';
import Contacto from '../pages/Contacto';
import Nosotros from '../pages/Nosotros'; 

const AppRouter = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alta" element={<Alta />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} /> 
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </main>
  );
};

export default AppRouter;

