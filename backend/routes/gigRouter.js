import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gigController.js";

const router = express.Router();

router.post("/",verifyToken, createGig);
router.get("/get", getGigs);
router.get("/single/:id", getGig);
router.delete("/delete/:id",verifyToken, deleteGig);

export default router;