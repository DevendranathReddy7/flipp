import { useEffect, useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer.js"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = useSelector((state) => state.cart)
    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h2>Payment Method</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" className="my-2" label='Paypal or Credit Card'
                            id='Paypal' name="paymentMethod" value='Paypal' checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}
export default PaymentPage