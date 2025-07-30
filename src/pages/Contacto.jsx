import { useState } from "react";
import toast from "react-hot-toast";

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    comentarios: "",
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!/\S+@\S+\.\S+/.test(form.email))
      nuevosErrores.email = "Email inválido";
    if (form.comentarios.length < 10)
      nuevosErrores.comentarios = "Debe escribir al menos 10 caracteres";
    return nuevosErrores;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    setErrores(validar());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    toast.success("Mensaje enviado");
    setForm({ nombre: "", email: "", comentarios: "" });
  };

  return (
    <section className="form">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form__group">
          <label className="form__label">Nombre</label>
          <input
            className="form__input"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errores.nombre && (
            <span className="form__error">{errores.nombre}</span>
          )}
        </div>

        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errores.email && (
            <span className="form__error">{errores.email}</span>
          )}
        </div>

        <div className="form__group">
          <label className="form__label">Comentarios</label>
          <textarea
            className="form__textarea"
            name="comentarios"
            value={form.comentarios}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errores.comentarios && (
            <span className="form__error">{errores.comentarios}</span>
          )}
        </div>

        <button type="submit" className="form__button">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contacto;


