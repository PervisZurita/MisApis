import { Router } from 'express';
import { getAllCarros, getCarroById, postCarro, putCarro, deleteCarro } from '../controllers/carro.controller.js';

const carro = Router();

carro.get('/', getAllCarros);

carro.get('/:id', getCarroById);

carro.put('/:id', putCarro); // Incluye `:id` en la ruta PUT para actualizar un carro específico.
carro.post('/', postCarro);

carro.delete('/:id', deleteCarro);

export default carro;
