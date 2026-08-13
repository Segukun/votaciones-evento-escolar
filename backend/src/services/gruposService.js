const Grupo = require("../models/Grupo");

async function obtenerGrupos() {
  return await Grupo.find();
}

async function obtenerGrupoPorId(id) {
  return await Grupo.findById(id);
}

async function crearGrupo(grupoData) {
  const { nombre, integrantes, descripcion, historia, imagen } = grupoData;

  if (!nombre || !integrantes || !descripcion || !historia || !imagen) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await Grupo.create({
    nombre,
    integrantes,
    descripcion,
    historia,
    imagen,
  });
}

async function actualizarGrupo(id, grupoData) {
  // TODO: no actualizar todos los campos. Solo los que se busque actualizar. Ahora mismo, en el caso de que se quiera actualizar solo el nombre, los demas campos quedarian vacios.
  const { nombre, integrantes, descripcion, historia, imagen } = grupoData;

  return await Grupo.findByIdAndUpdate(id, {
    nombre,
    integrantes,
    descripcion,
    historia,
    imagen,
  });
}

async function eliminarGrupo(id) {
  return await Grupo.findByIdAndDelete(id);
}

module.exports = {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
};
