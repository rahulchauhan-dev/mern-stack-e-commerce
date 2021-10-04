import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { removeFromWish } from '../actions/wishActions'



const WishListScreen = () => {


    const dispatch1 = useDispatch()
    const dispatch2 = useDispatch()


    const wishList = useSelector((state) => state.wishList)
    const { wishlist } = wishList


    const removeFromWishHandler = (id) => {
        dispatch1(removeFromWish(id))
        dispatch2(removeFromWish(id))


    }

    return (
        <Container style={{ paddingTop: '120px' }}>
            <Row>
                <Col md={8}>
                    <h1>Your Wishlist</h1>
                    {wishlist.length === 0 ? (
                        <Message>
                            Your Wishlist is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {wishlist.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/${item.gender}/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>Rs.{item.price}</Col>

                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromWishHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

            </Row>
        </Container >
    )
}

export default WishListScreen
