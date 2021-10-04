import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar expand="lg" collapseOnSelect fixed="top" id="navbar">

                <Container id="navcontainer" className='fluid' >
                    <LinkContainer to='/'>
                        <Navbar.Brand><img
                            src="/Banners/logo2.jpg"
                            width="200"
                            height="60"
                            className="d-inline-block align-top"
                            alt="logo"
                        /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="MENS">
                                <NavDropdown title="TOPWEAR">
                                    <LinkContainer to='/menswear/shirt'>
                                        <NavDropdown.Item>Shirt</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/tshirt'>
                                        <NavDropdown.Item>Tshirt</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/jacket'>
                                        <NavDropdown.Item>Jackets</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="BOTTOMWEAR">
                                    <LinkContainer to='/menswear/jeans'>
                                        <NavDropdown.Item>Jeans</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/trousers'>

                                        <NavDropdown.Item>Trousers</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/menswear/shots'>
                                        <NavDropdown.Item>Shots</NavDropdown.Item></LinkContainer>
                                </NavDropdown>

                                <NavDropdown.Divider />
                                <LinkContainer to='/menswear/indi'>

                                    <NavDropdown.Item>Indian & FestiveWear</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                <LinkContainer to='/menswear/suits'>

                                    <NavDropdown.Item>Suits</NavDropdown.Item></LinkContainer>
                            </NavDropdown>


                            <NavDropdown title="WOMENS">

                                <NavDropdown title="TOPWEAR">
                                    <LinkContainer to='/womenswear/top'>

                                        <NavDropdown.Item>Tops</NavDropdown.Item></LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/kurti'>

                                        <NavDropdown.Item>Kurtis</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/jacket'>

                                        <NavDropdown.Item>Jackets</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="BOTTOMWEAR">
                                    <LinkContainer to='/womenswear/jeans'>
                                        <NavDropdown.Item>Jeans</NavDropdown.Item>
                                    </LinkContainer><NavDropdown.Divider />
                                    <LinkContainer to='/womenswear/trouser'>

                                        <NavDropdown.Item>Trousers</NavDropdown.Item></LinkContainer>

                                </NavDropdown>

                                <NavDropdown.Divider />
                                <LinkContainer to='/womenswear/indi'>

                                    <NavDropdown.Item>Indian & FestiveWear</NavDropdown.Item></LinkContainer>
                            </NavDropdown>

                        </Nav>

                        <Nav className="ml-auto">
                            <Route render={({ history }) => <SearchBox history={history} />} />
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link></LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/wishlist'>
                                        <NavDropdown.Item>Wishlist</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link></LinkContainer>}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown title='Products'>
                                        <LinkContainer to='/admin/menproductslist'>
                                            <NavDropdown.Item>MENS</NavDropdown.Item></LinkContainer><NavDropdown.Divider />
                                        <LinkContainer to='/admin/womenproductslist'>
                                            <NavDropdown.Item>WOMENS</NavDropdown.Item></LinkContainer>
                                    </NavDropdown>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/contacts'>
                                        <NavDropdown.Item>Contacts</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>


                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header
