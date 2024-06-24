import { Router } from 'express';
import BookController from '../controllers/book.controller';

const router: Router = Router();

router.post('/books', BookController.instance.create);
router.get('/books', BookController.instance.getAll);
router.get('/books/:id', BookController.instance.getById);
router.put('/books/:id', BookController.instance.update);
router.delete('/books/:id', BookController.instance.delete);

export default router;
