import Products from "../components/Products"
import { Col, Row } from "react-bootstrap"
import { useGetProductQuery } from "../slices/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
// import axios from 'axios'
// import { useEffect, useState } from "react"

const Homepage = () => {
    // const [products, setProducts] = useState([])

    // useEffect(() => {
    //     const fetechProducts = async () => {
    //         const { data } = await axios.get('/api/products')
    //         setProducts(data)
    //     }
    //     fetechProducts()
    // }, [])

    //OR

    const { data: products, isLoading, error } = useGetProductQuery()

    return (

        <>
            {isLoading ? <Loader /> : error ?
                <Message variant={"danger"}>
                    {error?.data?.message || error?.error}
                </Message> : (
                    <>
                        <h1>Latest Products</h1 >
                        <Row>
                            {products.map((prd) => (
                                <Col sm={12} md={6} lg={4} xl={3} key={prd._id}>
                                    <Products product={prd} />
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

        </>
    )
}
export default Homepage