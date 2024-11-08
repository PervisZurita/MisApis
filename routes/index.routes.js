import ejemplo from './ejemplo.routes.js';
import carro from './carro.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/carro', carro);

export default indexRoutes;
