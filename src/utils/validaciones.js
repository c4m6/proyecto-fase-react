export const validarProducto = (data) => {
  const errores = {};

  if (!data.nombre.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!data.precio || isNaN(data.precio) || data.precio <= 0)
    errores.precio = 'Precio inválido';
  if (!data.stock || isNaN(data.stock) || data.stock < 0)
    errores.stock = 'Stock inválido';
  if (!data.marca.trim()) errores.marca = 'La marca es obligatoria';
  if (!data.categoria.trim()) errores.categoria = 'La categoría es obligatoria';
  if (!data.descripcionCorta.trim() || data.descripcionCorta.length < 10)
    errores.descripcionCorta = 'Min. 10 caracteres';
  if (!data.descripcionLarga.trim() || data.descripcionLarga.length < 20)
    errores.descripcionLarga = 'Min. 20 caracteres';
  if (!data.edadDesde || isNaN(data.edadDesde))
    errores.edadDesde = 'Edad mínima inválida';
  if (!data.edadHasta || isNaN(data.edadHasta))
    errores.edadHasta = 'Edad máxima inválida';
  if (Number(data.edadHasta) < Number(data.edadDesde))
    errores.edadHasta = 'Debe ser mayor o igual a Edad Desde';
  if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(data.foto))
    errores.foto = 'Debe ser una URL válida de imagen';

  return errores;
};
