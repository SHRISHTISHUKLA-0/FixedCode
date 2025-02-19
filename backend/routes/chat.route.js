import e from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createConversation, history } from "../controllers/chat.controller.js";

const router = e.Router();

router.post('/', authMiddleware, createConversation);
router.get('/history', authMiddleware, history);

export default router;
