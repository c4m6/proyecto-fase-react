import { createContext, useContext, useEffect, useState } from 'react';

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products'); 
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      const data = await res.json();
      setProductos((prev) => [...prev, data]);
      return { éxito: true, data };
    } catch (error) {
      console.error('Error al agregar producto', error);
      return { éxito: false };
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, loading, agregarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);
