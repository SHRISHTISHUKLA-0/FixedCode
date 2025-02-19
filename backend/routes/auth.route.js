import e from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/login", login);
router.post('/register', register);

export default router;