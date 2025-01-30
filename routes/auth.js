import express from 'express';
import { register, login, deleteUser } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', authMiddleware, deleteUser);

export default router;
