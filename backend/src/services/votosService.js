const mongoose = require('mongoose');
const Voto = require('../models/Voto');
const Grupo = require('../models/Grupo');
const Categoria = require('../models/Categoria');

async function verificarVotoExistente(categoriaId, identificadorDispositivo) {
  const voto = await Voto.exists({
    categoriaId,
    identificadorDispositivo
  });

  return Boolean(voto);
}

async function registrarVoto(datosVoto) {
  const {
    grupoId,
    categoriaId,
    identificadorDispositivo
  } = datosVoto;

  // Validar IDs
  if (
    !mongoose.Types.ObjectId.isValid(grupoId) ||
    !mongoose.Types.ObjectId.isValid(categoriaId)
  ) {
    const error = new Error('grupoId o categoriaId no son válidos.');
    error.status = 400;
    throw error;
  }

  // Validar identificador del dispositivo
  if (
    !identificadorDispositivo ||
    typeof identificadorDispositivo !== 'string' ||
    identificadorDispositivo.trim() === ''
  ) {
    const error = new Error('Falta el identificador del dispositivo o no es válido.');
    error.status = 400;
    throw error;
  }

  const identificadorLimpio = identificadorDispositivo.trim();

  // Comprobar que exista el grupo
  const grupoExiste = await Grupo.exists({
    _id: grupoId
  });

  if (!grupoExiste) {
    const error = new Error('El grupo indicado no existe.');
    error.status = 404;
    throw error;
  }

  // Comprobar que exista la categoría
  const categoriaExiste = await Categoria.exists({
    _id: categoriaId
  });

  if (!categoriaExiste) {
    const error = new Error('La categoría indicada no existe.');
    error.status = 404;
    throw error;
  }

  // Comprobar si ese dispositivo ya votó en esa categoría
  const yaVoto = await verificarVotoExistente(
    categoriaId,
    identificadorLimpio
  );

  if (yaVoto) {
    const error = new Error(
      'Ya se registró un voto en esta categoría desde este dispositivo.'
    );
    error.status = 409;
    throw error;
  }

  try {
    // Crear el voto
    const voto = await Voto.create({
      grupoId,
      categoriaId,
      identificadorDispositivo: identificadorLimpio
    });

    return voto;
  } catch (error) {
    // Protección adicional por si dos solicitudes llegan
    // prácticamente al mismo tiempo.
    if (error.code === 11000) {
      const errorDuplicado = new Error(
        'Ya se registró un voto en esta categoría desde este dispositivo.'
      );

      errorDuplicado.status = 409;
      throw errorDuplicado;
    }

    throw error;
  }
}

async function obtenerLeaderboard() {
  return Voto.aggregate([
    {
      $group: {
        _id: '$grupoId',
        votos: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        votos: -1
      }
    }
  ]);
}

async function obtenerLeaderboardPorCategoria(categoriaId) {
  if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
    const error = new Error('El categoriaId no es válido.');
    error.status = 400;
    throw error;
  }

  const categoriaExiste = await Categoria.exists({
    _id: categoriaId
  });

  if (!categoriaExiste) {
    const error = new Error('La categoría indicada no existe.');
    error.status = 404;
    throw error;
  }

  return Voto.aggregate([
    {
      $match: {
        categoriaId: new mongoose.Types.ObjectId(categoriaId)
      }
    },
    {
      $group: {
        _id: '$grupoId',
        votos: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        votos: -1
      }
    }
  ]);
}

module.exports = {
  registrarVoto,
  verificarVotoExistente,
  obtenerLeaderboard,
  obtenerLeaderboardPorCategoria
};