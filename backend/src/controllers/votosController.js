const votosService = require('../services/votosService');

async function registrarVoto(req, res) {
  try {
    const voto = await votosService.registrarVoto(req.body);

    return res.status(201).json({
      mensaje: 'Voto registrado correctamente.',
      voto
    });
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      mensaje: error.message || 'Error al registrar el voto.'
    });
  }
}

async function verificarVotoExistente(req, res) {
  try {
    const {
      categoriaId,
      identificadorDispositivo
    } = req.query;

    if (!categoriaId || !identificadorDispositivo) {
      return res.status(400).json({
        mensaje:
          'categoriaId e identificadorDispositivo son obligatorios.'
      });
    }

    const yaVoto = await votosService.verificarVotoExistente(
      categoriaId,
      identificadorDispositivo
    );

    return res.status(200).json({
      yaVoto
    });
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      mensaje: error.message || 'Error al verificar el voto.'
    });
  }
}

async function obtenerLeaderboard(req, res) {
  try {
    const leaderboard = await votosService.obtenerLeaderboard();

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      mensaje: error.message || 'Error al obtener el leaderboard.'
    });
  }
}

async function obtenerLeaderboardPorCategoria(req, res) {
  try {
    const { categoriaId } = req.params;

    const leaderboard =
      await votosService.obtenerLeaderboardPorCategoria(categoriaId);

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);

    return res.status(error.status || 500).json({
      mensaje: error.message || 'Error al obtener el leaderboard.'
    });
  }
}

module.exports = {
  registrarVoto,
  verificarVotoExistente,
  obtenerLeaderboard,
  obtenerLeaderboardPorCategoria
};