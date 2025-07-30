import { useState } from "react";

const camposIniciales = {
  nombre: "",
  precio: "",
  stock: "",
  marca: "",
  categoria: "",
  descripcionCorta: "",
  descripcionLarga: "",
  envioSinCargo: false,
  edadDesde: "",
  edadHasta: "",
  foto: "",
};

const Alta = () => {
  const [formulario, setFormulario] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormulario({ ...formulario, [name]: newValue });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validarCampo(name, formulario[name]);
  };

  const validarCampo = (name, value) => {
    let mensaje = "";

    switch (name) {
      case "nombre":
      case "marca":
      case "categoria":
      case "descripcionCorta":
      case "descripcionLarga":
        if (!value.trim()) mensaje = "Este campo es obligatorio";
        break;
      case "precio":
      case "stock":
      case "edadDesde":
      case "edadHasta":
        if (!value) mensaje = "Este campo es obligatorio";
        else if (isNaN(value) || Number(value) < 0)
          mensaje = "Debe ser un número válido";
        break;
      case "foto":
        if (!value.trim()) mensaje = "URL de imagen obligatoria";
        break;
      default:
        break;
    }

    setErrores((prev) => ({ ...prev, [name]: mensaje }));
  };

  const validarTodo = () => {
    const nuevosErrores = {};
    for (const campo in camposIniciales) {
      validarCampo(campo, formulario[campo]);
      if (!formulario[campo] && campo !== "envioSinCargo") {
        nuevosErrores[campo] = "Este campo es obligatorio";
      }
    }

    // Revalidación manual extra
    if (
      formulario.edadDesde &&
      formulario.edadHasta &&
      Number(formulario.edadDesde) > Number(formulario.edadHasta)
    ) {
      nuevosErrores.edadHasta = "Edad hasta debe ser mayor o igual a edad desde";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(camposIniciales).reduce((acc, campo) => ({ ...acc, [campo]: true }), {}));

    if (!validarTodo()) return;

    fetch("https://686ac03ae559eba90870d2bb.mockapi.io/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al enviar el producto");
        return res.json();
      })
      .then((data) => {
        alert("✅ Producto cargado con éxito");
        console.log("Guardado:", data);
        setFormulario(camposIniciales);
        setTouched({});
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("Ocurrió un error al guardar el producto.");
      });
  };

  const renderError = (campo) =>
    touched[campo] && errores[campo] && <p className="form__error">{errores[campo]}</p>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {[
        ["nombre", "Nombre"],
        ["precio", "Precio", "number"],
        ["stock", "Stock", "number"],
        ["marca", "Marca"],
        ["categoria", "Categoría"],
        ["descripcionCorta", "Descripción corta"],
        ["descripcionLarga", "Descripción larga"],
        ["edadDesde", "Edad desde", "number"],
        ["edadHasta", "Edad hasta", "number"],
        ["foto", "Foto (URL)"],
      ].map(([name, label, type = "text"]) => (
        <div className="form__group" key={name}>
          <label className="form__label" htmlFor={name}>{label}</label>
          <input
            className="form__input"
            type={type}
            id={name}
            name={name}
            value={formulario[name]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderError(name)}
        </div>
      ))}

      <div className="form__group">
        <label className="form__label">
          <input
            type="checkbox"
            name="envioSinCargo"
            checked={formulario.envioSinCargo}
            onChange={handleChange}
          />
          Envío sin cargo
        </label>
      </div>

      <button className="form__button" type="submit">
        Cargar producto
      </button>
    </form>
  );
};

export default Alta;


