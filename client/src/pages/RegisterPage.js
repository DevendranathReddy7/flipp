import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from "../components/FormContainer.js"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader.js"
import { useRegisterMutation } from "../slices/usersApiSlice.js"
import { setCredentials } from "../slices/authSlice.js"
import { toast } from 'react-toastify'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((store) => store.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password not matched')
            return
        } else {
            try {
                const res = await register({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error?.message)
            }
        }


    }
    return (
        <FormContainer>
            <h2>Sign Up</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>confirm Password</Form.Label>
                    <Form.Control type="email" placeholder="confirm Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Sign Up
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Existing Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}
export default RegisterPage