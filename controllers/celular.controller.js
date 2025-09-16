import Celular from '../models/celular.model.js';
import mongoose from 'mongoose';

export const getAllCelulares = async (req, res) => {
  console.log('Obteniendo todos los celulares');

  try {
    const celulares = await Celular.find({}, { __v: 0 });

    if (!celulares || celulares.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron celulares.'
      });
    }

    return res.status(200).json({ celulares });

  } catch (error) {
    console.error('Error al obtener los celulares:', error);
    return res.status(500).json({
      msg: 'Hubo un error al obtener los celulares, inténtelo de nuevo más tarde.'
    });
  }
};

export const getCelularById = async (req, res) => {
  console.log('CELULAR POR ID');

  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const celular = await Celular.findById(id);

    if (!celular) {
      return res.status(404).json({ msg: 'Celular no encontrado' });
    }

    return res.status(200).json({ celular });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener el celular' });
  }
};

export const postCelular = async (req, res) => {
  console.log('POST CELULAR');
  const body = req.body;
  const celular = new Celular(body);
  try {
    const validationError = celular.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(error => error.message);
      return res.status(400).json({
        error: errorMessages
      });
    }
    await celular.save();
    return res.status(201).json({ celular });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar el celular'
    });
  }
};

export const putCelular = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const celular = await Celular.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!celular) {
      return res.status(404).json({ msg: 'Celular no encontrado' });
    }
    return res.status(200).json({ celular });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al actualizar el celular' });
  }
};

export const deleteCelular = async (req, res) => {
  console.log('DELETE CELULAR');

  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const celular = await Celular.findByIdAndDelete(id);

    if (!celular) {
      return res.status(404).json({ msg: 'Celular no encontrado' });
    }
    return res.status(200).json({ msg: 'Celular eliminado', celular });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al eliminar el celular' });
  }
};

export const getCelularesByCategoria = async (req, res) => {
  console.log('Celulares por categoría');

  const { categoria } = req.params; // se espera algo como /celular/categoria/Alta

  try {
    const celulares = await Celular.find({ categoria });

    if (!celulares || celulares.length === 0) {
      return res.status(404).json({
        msg: `No se encontraron celulares en la categoría: ${categoria}`
      });
    }

    return res.status(200).json({ celulares });
  } catch (error) {
    console.error('Error al obtener celulares por categoría:', error);
    return res.status(500).json({
      msg: 'Error al obtener los celulares por categoría'
    });
  }
};
