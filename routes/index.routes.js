import ejemplo from './ejemplo.routes.js';
import pc from './pc.routes.js';
import celular from './celular.routes.js'; 
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/pc', pc);
indexRoutes.use('/celular', celular);

export default indexRoutes;
