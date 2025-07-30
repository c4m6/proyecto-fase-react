import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";

const ModalCarrito = ({ mostrarModal, toggleModal }) => {
  const {
    carrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) toggleModal();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };

    if (mostrarModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mostrarModal, toggleModal]);

  const handleVaciarCarrito = () => {
    const confirmar = window.confirm("¿Estás seguro de que querés vaciar el carrito?");
    if (confirmar) {
      vaciarCarrito();
    }
  };

  return mostrarModal ? (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__cerrar" onClick={toggleModal}>
          X
        </button>

        {carrito.length > 0 ? (
          <>
            <ul className="modal__lista">
              {carrito.map((producto) => (
                <li key={producto.id} className="modal__item">
                  <img src={producto.foto} alt={producto.nombre} />
                  <div>
                    <p><strong>{producto.nombre}</strong></p>
                    <p>Precio: ${producto.precio}</p>
                    <p>
                      Cantidad:{" "}
                      <button onClick={() => decrementarCantidad(producto.id)}>-</button>
                      <input type="number" value={producto.cantidad} readOnly />
                      <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                    </p>
                    <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                    <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="modal__total">
              <strong>Total:</strong> $
              {carrito.reduce(
                (total, producto) => total + producto.precio * producto.cantidad,
                0
              )}
            </p>

            <button className="modal__vaciar" onClick={handleVaciarCarrito}>
              Vaciar carrito
            </button>
          </>
        ) : (
          <p className="modal__vacio">El carrito está vacío.</p>
        )}
      </div>
    </div>
  ) : null;
};

export default ModalCarrito;





