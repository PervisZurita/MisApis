import PC from '../models/pc.model.js';
import mongoose from 'mongoose';

export const getAllPCs = async (req, res) => {
  console.log('Obteniendo todas las PCs');

  try {
    const pcs = await PC.find({}, { __v: 0 });

    if (!pcs || pcs.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron PCs.'
      });
    }

    return res.status(200).json({
      pcs
    });

  } catch (error) {
    console.error('Error al obtener las PCs:', error);
    return res.status(500).json({
      msg: 'Hubo un error al obtener las PCs, inténtelo de nuevo más tarde.'
    });
  }
};

export const getPCById = async (req, res) => {
  console.log('PC POR ID');

  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const pc = await PC.findById(id);

    if (!pc) {
      return res.status(404).json({ msg: 'PC no encontrada' });
    }

    return res.status(200).json({ pc });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener la PC' });
  }
};

export const postPC = async (req, res) => {
  console.log('POST PC');
  const body = req.body;
  const pc = new PC(body);
  try {
    const validationError = pc.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(error => error.message);
      return res.status(400).json({
        error: errorMessages
      });
    }
    await pc.save();
    return res.status(201).json({
      pc
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar la PC'
    });
  }
};

export const putPC = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const pc = await PC.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!pc) {
      return res.status(404).json({ msg: 'PC no encontrada' });
    }
    return res.status(200).json({ pc })
  } catch (error) {
    return res.status(500).json({ msg: 'Error al actualizar la PC' });
  }
};

export const deletePC = async (req, res) => {
  console.log('DELETE PC');

  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const pc = await PC.findByIdAndDelete(id);

    if (!pc) {
      return res.status(404).json({ msg: 'PC no encontrada' });
    }
    return res.status(200).json({ msg: 'PC eliminada', pc })
  } catch (error) {
    return res.status(500).json({ msg: 'Error al eliminar la PC' });
  }
};
export const getPCsByCategoria = async (req, res) => {
  console.log('PCs por categoría');

  const { categoria } = req.params; // se espera algo como /pc/categoria/Gaming

  try {
    const pcs = await PC.find({ categoria });

    if (!pcs || pcs.length === 0) {
      return res.status(404).json({
        msg: `No se encontraron PCs en la categoría: ${categoria}`
      });
    }

    return res.status(200).json({ pcs });
  } catch (error) {
    console.error('Error al obtener PCs por categoría:', error);
    return res.status(500).json({
      msg: 'Error al obtener las PCs por categoría'
    });
  }
};
