import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Ratings from "../components/Ratings.js"
import { useGetProductDetailsQuery } from "../slices/productApiSlice.js"
import Loader from "../components/Loader.js"
import Message from "../components/Message.js"
import { useState } from "react"
import { addToCart } from "../slices/cartSlice.js"
import { useDispatch } from "react-redux"
// import axios from "axios"

const ProductDetailPage = () => {
    const { prdid: productId } = useParams()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //    const [selectedProduct, setSelectedProduct] = useState({})
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`)
    //         setSelectedProduct(data)
    //     }
    //     fetchProduct()
    // }, [productId])

    //OR

    const { data: selectedProduct, isLoading, error } = useGetProductDetailsQuery(productId)

    const addToCartHandler = () => {
        dispatch(addToCart({ ...selectedProduct, qty }))
        navigate('/cart')
    }

    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Back</Link>

            {isLoading ? <Loader /> : error ? <Message variant={"danger"}>
                {error?.data?.message || error?.error}
            </Message> :

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
                                {selectedProduct.countInStock > 0 && (
                                    < ListGroup.Item >
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                    {[...Array(selectedProduct.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col><strong>{selectedProduct.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button className="btn-block" type="button" disabled={selectedProduct.countInStock === 0}
                                        onClick={addToCartHandler}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row >
            }
        </>
    )
}
export default ProductDetailPage