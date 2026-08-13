const categoriasService = require('../services/categoriasService');

async function obtenerCategorias(req, res, next) {
  try {
    const categorias = await categoriasService.obtenerCategorias();
    return res.status(200).json(categorias);
  } catch (error) {
    return next(error);
  }
}

async function obtenerCategoriaPorId(req, res, next) {
  try {
    const { id } = req.params;
    const categoria = await categoriasService.obtenerCategoriaPorId(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res.status(200).json(categoria);
  } catch (error) {
    return next(error);
  }
}

async function crearCategoria(req, res, next) {
  try {
    const datos = req.body;
    const categoria = await categoriasService.crearCategoria(datos);
    return res.status(201).json(categoria);
  } catch (error) {
    if (error.status === 400 || (error.message && error.message.includes('nombre'))) {
      return res.status(400).json({ mensaje: error.message });
    }
    return next(error);
  }
}

async function actualizarCategoria(req, res, next) {
  try {
    const { id } = req.params;
    const datos = req.body;
    const categoriaActualizada = await categoriasService.actualizarCategoria(id, datos);
    if (!categoriaActualizada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res.status(200).json(categoriaActualizada);
  } catch (error) {
    if (error.status === 400 || (error.message && error.message.includes('nombre'))) {
      return res.status(400).json({ mensaje: error.message });
    }
    return next(error);
  }
}

async function eliminarCategoria(req, res, next) {
  try {
    const { id } = req.params;
    const categoriaEliminada = await categoriasService.eliminarCategoria(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
