import express from "express";
import { getAllPCs, getPCById, postPC, putPC, deletePC, getPCsByCategoria } from "../controllers/pc.controller.js";

const router = express.Router();

router.get("/", getAllPCs);
router.get("/:id", getPCById);
router.post("/", postPC);
router.put("/:id", putPC);
router.delete("/:id", deletePC);

// NUEVA RUTA: filtrar por categoría
router.get("/categoria/:categoria", getPCsByCategoria);

export default router;
