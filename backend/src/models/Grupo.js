//Modelo simple de los grupos. No hay validacion con zod porque los datos los vamos a ingresar nosotros y no van a ser modificados por el usuario.
import mongoose from "mongoose";

const grupoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true }, //Nombre
    integrates: [{ type: String, required: true, trim: true }], //Lista de nombres
    descripcion: { type: String, default: "" }, //Texto breve
    historia: { type: String, default: "" }, //Breve texto
    imagen: { type: String, required: true }, //Link
  },
  { timestamps: true },
);

export default mongoose.model("Grupo", grupoSchema);
