require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'El servidor funciona correctamente.' });
});

async function iniciarServidor() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor disponible en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

iniciarServidor();

module.exports = app;
