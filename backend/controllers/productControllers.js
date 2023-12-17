import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../modals/productModal.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const prd = await Product.findById(req.params.prdid)
    if (prd) {
        return res.json(prd)
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

export { getProductById, getProducts }