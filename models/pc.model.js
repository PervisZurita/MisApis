// Definimos un esquema tipo "PC"
import mongoose from "mongoose";

const pcSchema = new mongoose.Schema({
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
    type: Number, // en GB o TB
    required: false
  },
  categoria: {
    type: String,
    required: false
  },
  imagenUrl: {
    type: String, 
    required: false,
    default: ""   
  }
});

// Creamos el modelo
const PC = mongoose.model("PC", pcSchema);

export default PC;
