import express from 'express';
import { createProducts, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products';

const router = express.Router()


router.post('/', createProducts)

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)


export default router;