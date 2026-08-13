const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('Falta definir MONGODB_URI en las variables de entorno.');
  }

  await mongoose.connect(mongoUri);
  console.log('Base de datos conectada.');
}

module.exports = connectDB;

