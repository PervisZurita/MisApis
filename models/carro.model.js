import mongoose from 'mongoose';

const carroSchema = new mongoose.Schema({
    marca: {
      type: String,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    año: {
      type: Number,
      required: true
    },
    precio: {
      type: Number,
      required: false
    },
    color:{
        type:String,
        required:true
    }
});

const Carro = mongoose.model('Carro', carroSchema);

export default Carro;