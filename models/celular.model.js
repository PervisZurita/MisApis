// Definimos un esquema tipo "Celular"
import mongoose from "mongoose";

const celularSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  procesador: {
    type: String,
    required: true
  },
  ram: {
    type: Number, // en GB
    required: true
  },
  almacenamiento: {
    type: Number, // en GB
    required: true
  },
  pantalla: {
    tamano: { type: Number, required: false }, // en pulgadas
    resolucion: { type: String, required: false }, // ej: "2400x1080"
    tecnologia: { type: String, required: false } // ej: "AMOLED"
  },
  camara: {
    principal: { type: Number, required: false }, // en MP
    frontal: { type: Number, required: false } // en MP
  },
  bateria: {
    capacidad: { type: Number, required: false } // en mAh
  },
  sistemaOperativo: {
    type: String,
    required: false
  },
  categoria: {
    type: String,
    required: false // gama baja, media, alta
  },
  imagenUrl: {
    type: String,
    required: false,
    default: ""
  }
});

// Creamos el modelo
const Celular = mongoose.model("Celular", celularSchema);

export default Celular;
