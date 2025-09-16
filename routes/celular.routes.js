// routes/celular.routes.js
import express from "express";
import { 
  getAllCelulares, 
  getCelularById, 
  postCelular, 
  putCelular, 
  deleteCelular, 
  getCelularesByCategoria 
} from "../controllers/celular.controller.js";

const router = express.Router();

router.get("/", getAllCelulares);
router.get("/:id", getCelularById);
router.post("/", postCelular);
router.put("/:id", putCelular);
router.delete("/:id", deleteCelular);

router.get("/categoria/:categoria", getCelularesByCategoria);

export default router;
