const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriaSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    activa: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categoria', categoriaSchema);
