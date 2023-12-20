import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import icon from '../assests/icon.png'
import { useLogoutMutation } from '../slices/usersApiSlice.js'
import { logout } from '../slices/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
    const { cartItem } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log(error?.data?.message || error?.message)
            toast('couldn\'t logged out')
        }
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><img src={icon} /><strong> Flipp</strong></Navbar.Brand>

                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart /> Cart
                                    {
                                        cartItem?.length > 0 && (<Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                            {cartItem.reduce((acc, cur) => acc + cur.qty, 0)}
                                        </Badge>
                                        )

                                    }
                                </Nav.Link>

                            </LinkContainer>
                            {userInfo ? <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown> :
                                (<LinkContainer to='/login'>
                                    <Nav.Link ><FaUser /> Sign In</Nav.Link>
                                </LinkContainer>)}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header