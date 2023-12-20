import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from "../components/FormContainer.js"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader.js"
import { useLoginMutation } from "../slices/usersApiSlice.js"
import { setCredentials } from "../slices/authSlice.js"
import { toast } from 'react-toastify'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((store) => store.auth)

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error?.message)
        }

    }
    return (
        <FormContainer>
            <h2>Sign In</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="email" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}
export default LoginPage