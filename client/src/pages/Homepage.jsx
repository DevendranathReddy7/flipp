import { useEffect, useState } from "react"
import Products from "../components/Products"
import { Col, Row } from "react-bootstrap"
import axios from 'axios'
const Homepage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetechProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetechProducts()
    }, [])
    console.log(products);
    return (
        <Row>
            {products.map((prd) => (
                <Col sm={12} md={6} lg={4} xl={3} key={prd._id}>
                    <Products product={prd} />
                </Col>
            ))}
        </Row>
    )
}
export default Homepage