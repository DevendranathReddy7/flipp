import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Ratings from "../components/Ratings.js"
import { useEffect, useState } from "react"
import axios from "axios"
const ProductDetailPage = () => {
    const [selectedProduct, setSelectedProduct] = useState({})
    const { prdid: productId } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${productId}`)
            setSelectedProduct(data)
        }
        fetchProduct()
    }, [productId])

    return (
        <>
            <Link className="btn btn-light my-3">Back</Link>

            <Row>
                <Col md={5}>
                    <Image src={selectedProduct.image} fluid />
                </Col>

                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3 className="product-title">{selectedProduct.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings value={selectedProduct.rating} text={`${selectedProduct.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {selectedProduct.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${selectedProduct.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col><strong>{selectedProduct.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={selectedProduct.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default ProductDetailPage