import { Router } from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js'
import { isAdmin, isModerator, verifyToken } from '../middlewares/authJwt.js'

const router = Router()

router.get('/', getProducts)
router.post('/', [verifyToken, isModerator], createProduct)
router.put('/:productId', [verifyToken, isAdmin], updateProduct)
router.delete('/:productId', [verifyToken, isAdmin], deleteProduct)
router.get('/:productId', getProduct)

export default router
