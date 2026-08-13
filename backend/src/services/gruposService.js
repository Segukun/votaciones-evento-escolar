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
  const anterior = await Grupo.findById(id);
  if (!anterior) {
    throw new Error("Grupo no encontrado");
  }

  let { nombre, integrantes, descripcion, historia, imagen } = grupoData;

  if (!nombre && !integrantes && !descripcion && !historia && !imagen) {
    throw new Error("No se ha proporcionado ningún campo para actualizar");
  }

  nombre = !nombre ? anterior.nombre : nombre;
  integrantes = !integrantes ? anterior.integrantes : integrantes;
  descripcion = !descripcion ? anterior.descripcion : descripcion;
  historia = !historia ? anterior.historia : historia;
  imagen = !imagen ? anterior.imagen : imagen;

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
