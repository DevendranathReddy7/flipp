import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 2000;
import { product } from './data/Products.js'
const app = express()

app.get('/api/products', (req, res) => {
    res.json(product)
})

app.get('/api/products/:id', (req, res) => {
    const prd = product.find(prd => prd._id === req.params.prdid)
    res.json(prd)
})

app.listen(port, () => console.log(`Server started on port:${port}`))