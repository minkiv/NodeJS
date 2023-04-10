import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/categories", getAll);
//single
router.get("/categories/:id", get);
// add
router.post("/categories", checkPermission, create);
// update
router.put("/categories/:id", checkPermission, update);
// delete
router.delete("/categories/:id", checkPermission, remove);

export default router;
