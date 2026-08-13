const grupoServices = require("../services/gruposService");

async function obtenerGrupos(req, res, next) {
  try {
    const grupos = await grupoServices.obtenerGrupos();
    if (grupos.length === 0) {
      return res.status(404).json({ message: "No hay grupos disponibles" });
    }
    res.status(200).json(grupos);
  } catch (error) {
    next(error);
  }
}

async function obtenerGrupoPorId(req, res, next) {
  try {
    const grupo = await grupoServices.obtenerGrupoPorId(req.params.id);
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
}

async function crearGrupo(req, res, next) {
  try {
    const grupoData = req.body;
    const grupo = await grupoServices.crearGrupo(grupoData);
    res.status(201).json(grupo);
  } catch (error) {
    next(error);
  }
}

async function actualizarGrupo(req, res, next) {
  try {
    const grupoData = req.body;
    const grupo = await grupoServices.actualizarGrupo(req.params.id, grupoData);
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json(grupo);
  } catch (error) {
    next(error);
  }
}

async function eliminarGrupo(req, res, next) {
  try {
    const grupo = await grupoServices.eliminarGrupo(req.params.id);
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json({ message: "Grupo eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
};
