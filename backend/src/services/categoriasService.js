const Categoria = require('../models/Categoria');

async function obtenerCategorias() {
  return await Categoria.find();
}

async function obtenerCategoriaPorId(id) {
  return await Categoria.findById(id);
}

async function crearCategoria(datos) {
  const { nombre } = datos || {};
  if (!nombre || !String(nombre).trim()) {
    const error = new Error('El nombre es obligatorio');
    error.status = 400;
    throw error;
  }
  return await Categoria.create(datos);
}

async function actualizarCategoria(id, datos) {
  if (datos && Object.prototype.hasOwnProperty.call(datos, 'nombre')) {
    if (!datos.nombre || !String(datos.nombre).trim()) {
      const error = new Error('El nombre es obligatorio');
      error.status = 400;
      throw error;
    }
  }
  const opciones = { new: true, runValidators: true };
  return await Categoria.findByIdAndUpdate(id, datos, opciones);
}

async function eliminarCategoria(id) {
  return await Categoria.findByIdAndDelete(id);
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
