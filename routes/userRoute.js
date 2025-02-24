import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/new").post(createUser);
router.route("/get").get(getUsers);

export default router;
