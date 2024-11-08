import Carro from '../models/carro.model.js';
import mongoose from 'mongoose';

export const getAllCarros = async (req, res) => {
    console.log('Obteniendo todos los carros');
    
    try {
      const carros = await Carro.find();  
      
      if (!carros || carros.length === 0) {
        return res.status(404).json({
          msg: 'No se encontraron carros.'
        });
      }
  
      return res.status(200).json({
        carros
      });
      
    } catch (error) {
      console.error('Error al obtener los carros:', error);
      return res.status(500).json({
        msg: 'Hubo un error al obtener los carros, inténtelo de nuevo más tarde.'
      });
    }
};


export const getCarroById = async (req, res) => {
    console.log('CARRO POR ID');
  
    const id = req.params.id;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID no válido' });
      }
  
      const carro = await Carro.findById(id);
  
      if (!carro) {
        return res.status(404).json({ msg: 'Carro no encontrado' });
      }
  
      return res.status(200).json({ carro });
    } catch (error) {
      return res.status(500).json({ msg: 'Error al obtener el carro' });
    }
};

export const postCarro = async (req, res) => {
    console.log('POST CARRO');
    const body = req.body;
    const carro = new Carro(body);
    try {
      const validationError = carro.validateSync();
      if (validationError) {
        const errorMessages = Object.values(validationError.errors).map(error => error.message);
        return res.status(400).json({
          error: errorMessages
        });
      }
      await carro.save();
      return res.status(201).json({
        carro
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error al guardar el carro'
      });
    }
};

export const putCarro = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID no válido' });
      }
  
      const carro = await Carro.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!carro) {
        return res.status(404).json({ msg: 'Carro no encontrado' });
      }
      return res.status(200).json({ carro });
    } catch (error) {
      return res.status(500).json({ msg: 'Error al actualizar el carro' });
    }
};

export const deleteCarro = async (req, res) => {
    console.log('DELETE CARRO');
  
    const id = req.params.id;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID no válido' });
      }
  
      const carro = await Carro.findByIdAndDelete(id);
  
      if (!carro) {
        return res.status(404).json({ msg: 'Carro no encontrado' });
      }
      return res.status(200).json({ msg: 'Carro eliminado', carro });
    } catch (error) {
      return res.status(500).json({ msg: 'Error al eliminar el carro' });
    }
};
