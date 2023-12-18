import { Badge, Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import icon from '../assests/icon.png'
const Header = () => {
    const { cartItem } = useSelector((state) => state.cart)
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
                            <LinkContainer to='/login'>
                                <Nav.Link ><FaUser /> Sign In</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header