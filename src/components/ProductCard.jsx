import { useCarrito } from "../context/CarritoContext";

const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="product-card">
      <img src={producto.foto} alt={producto.nombre} className="product-card__image" />
      <h3 className="product-card__title">{producto.nombre}</h3>
      <p className="product-card__price">${producto.precio}</p>
      <button
        className="product-card__button"
        onClick={() => agregarAlCarrito(producto)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;

