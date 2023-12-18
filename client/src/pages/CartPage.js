import { Link, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from "../slices/cartSlice"


const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { cartItem } = useSelector((state) => state.cart)

    const addToCartHandler = async (item, qnty) => {
        dispatch(addToCart({ ...item, qnty }))
    }

    const deleteHandler = async (item) => {
        dispatch(removeFromCart({ ...item }))
    }

    const checkOutHandler = async () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h2 style={{ marginBottom: '20px', marginTop: '10px' }}>Your Cart</h2>
                {cartItem.length === 0 ? (
                    <Message>Your cart is Empty <Link className="btn-dark" to='/'>Go Back</Link></Message>
                ) : (
                    <ListGroup variant="flush">{
                        cartItem.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt='image' fluid rounded />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => deleteHandler(item)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        ))
                    }

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card style={{ marginBottom: '20px', marginTop: '50px' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4 >
                                Sub-total ({cartItem.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h4>
                            ${cartItem.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItem.length === 0} onClick={checkOutHandler}>
                                Procced To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
export default CartPage