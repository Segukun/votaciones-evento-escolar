const express = require("express");
const gruposController = require("../controllers/gruposController");
const router = express.Router();

router.get("/", gruposController.obtenerGrupos);
router.get("/:id", gruposController.obtenerGrupoPorId);
router.post("/", gruposController.crearGrupo);
router.put("/:id", gruposController.actualizarGrupo);
router.delete("/:id", gruposController.eliminarGrupo);

module.exports = router;
