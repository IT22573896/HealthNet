import express from "express";

import { dcreate, ddelete, dgetAll, dgetone, dupdate, } from "../controllers/doctorController.js";


const router = express.Router();

router.post("/dcreate",dcreate);
router.get("/dgetall",dgetAll);
router.get("/dgetone/:id",dgetone);
router.put("/dupdate/:id",dupdate);
router.delete("/ddelete/:id",ddelete);



export default router;