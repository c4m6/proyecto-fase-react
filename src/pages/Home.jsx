import { useProductos } from "../context/ProductosContext"; 
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { productos, loading } = useProductos();

  if (loading) return <p>Cargando productos...</p>;

  return (
    <section className="productos">
      <h2 className="productos__titulo">Listado de Productos</h2>
      <div className="productos__grid">
        {productos.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </section>
  );
};

export default Home;





