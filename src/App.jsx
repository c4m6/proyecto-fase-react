import { useState } from "react";
import Header from './components/Header';
import ModalCarrito from './components/ModalCarrito';
import Footer from './components/Footer';
import AppRouter from './router/AppRouter';


import { CarritoProvider } from './context/CarritoContext';
import { ProductosProvider } from './context/ProductosContext';

function App() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const toggleModal = () => {
    setMostrarModal((prev) => !prev);
  };

  return (
    <ProductosProvider>
      <CarritoProvider>
        <Header toggleModal={toggleModal} />
        <AppRouter />
        <ModalCarrito mostrarModal={mostrarModal} toggleModal={toggleModal} />
        <Footer />
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;
