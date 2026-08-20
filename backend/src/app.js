require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/img", express.static(path.join(__dirname, "../img"))); //Esto es para que el frontend acceda a la carpeta de el backend

const categoriasRoutes = require("./routes/categoriasRoutes");
app.use("/api/categorias", categoriasRoutes);

const gruposRoutes = require("./routes/gruposRoutes");
app.use("/api/grupos", gruposRoutes);

const votosRoutes = require("./routes/votosRoutes");
app.use("/api/votos", votosRoutes);

app.get("/api/health", (req, res) => {
  res.json({ mensaje: "El servidor funciona correctamente." });
});

async function iniciarServidor() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor disponible en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  iniciarServidor();
}

module.exports = app;
