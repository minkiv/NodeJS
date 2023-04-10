import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/products", getAll);
//single
router.get("/products/:id", get);
// add
router.post("/products", checkPermission, create);
// update
router.put("/products/:id", checkPermission, update);
// delete
router.delete("/products/:id", checkPermission, remove);

export default router;
