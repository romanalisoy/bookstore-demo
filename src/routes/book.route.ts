import { Router } from 'express';
import BookController from '../controllers/book.controller';
import {authMiddleware} from "../middlewares/auth.middleware";

const router: Router = Router();

router.post('/books', authMiddleware, BookController.instance.create);
router.get('/books', BookController.instance.getAll);
router.get('/books/:id(\\d+)', BookController.instance.getById);
router.put('/books/:id(\\d+)', authMiddleware, BookController.instance.update);
router.delete('/books/:id(\\d+)', authMiddleware, BookController.instance.delete);

export default router;
