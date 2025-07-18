import express from "express";
import { trackTime, getTodayReport } from "../controllers/trackingController.js";

const router = express.Router();

router.post("/track", trackTime);
router.get("/report/today", getTodayReport);

export default router;
