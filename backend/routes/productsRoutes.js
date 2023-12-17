import express from 'express'
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productControllers.js'


router.route('/').get(getProducts)
router.route('/:prdid').get(getProductById)


export default router