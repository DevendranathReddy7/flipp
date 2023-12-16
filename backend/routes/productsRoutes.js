import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../modals/productModal.js'

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

router.get('/:prdid', asyncHandler(async (req, res) => {
    const prd = await Product.findById(req.params.prdid)
    if (prd) {
        return res.json(prd)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

}))


export default router