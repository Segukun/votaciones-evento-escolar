const express = require('express');
const votosController = require('../controllers/votosController');

const router = express.Router();

router.post(
  '/',
  votosController.registrarVoto
);

router.get(
  '/verificar',
  votosController.verificarVotoExistente
);

router.get(
  '/leaderboard',
  votosController.obtenerLeaderboard
);

router.get(
  '/leaderboard/:categoriaId',
  votosController.obtenerLeaderboardPorCategoria
);

module.exports = router;