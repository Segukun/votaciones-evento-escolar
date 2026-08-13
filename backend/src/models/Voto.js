const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema(
  {
    grupoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grupo',
      required: true
    },

    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },

    identificadorDispositivo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

votoSchema.index(
  {
    categoriaId: 1,
    identificadorDispositivo: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model('Voto', votoSchema);