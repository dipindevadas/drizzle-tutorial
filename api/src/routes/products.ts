import express from 'express';
import { createProducts, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products';
import { validate } from '../middleware/validationMiddleware';
import { verifyAdmin, verifyToken } from '../middlewares/verifyToken';

const router = express.Router()


router.post('/', verifyToken, verifyAdmin,  createProducts)

router.get('/', verifyToken, getAllProducts)

router.get('/:id', verifyToken, getProductById)

router.put('/:id',  verifyToken, verifyAdmin, updateProduct)
 
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct)


export default router;