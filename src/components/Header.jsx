import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext"; 
import logo from "../assets/tikitoy.png";

const Header = ({ toggleModal }) => {
  const { cantidadTotal } = useCarrito();

  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={logo} alt="Logo Tikitoy" className="header__logo" />
        <h1 className="header__title">Tikitoy</h1>
      </div>

      <nav className="header__nav">
        <Link to="/" className="header__nav-link">Home</Link>
        <Link to="/alta" className="header__nav-link">Alta</Link>
        <Link to="/contacto" className="header__nav-link">Contacto</Link>
        <Link to="/nosotros" className="header__nav-link">Nosotros</Link>
      </nav>

      <button className="header__carrito-btn" onClick={toggleModal}>
        🛒
        {cantidadTotal > 0 && (
          <span className="header__carrito-badge">{cantidadTotal}</span>
        )}
      </button>
    </header>
  );
};

export default Header;
