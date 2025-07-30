import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">Tikitoy</h2>
      <div className="footer__social"> 
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon"
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon"
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
