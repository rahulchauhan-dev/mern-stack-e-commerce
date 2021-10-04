import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    getOrderDetails, payOrder, deliverOrder
} from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'





const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()


    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (order) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }



    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        const addRazorScript = async () => {
            // const { data: clientId } = await axios.get('/api/config/razorpay')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })


            dispatch(getOrderDetails(orderId))

        } else if (!order.isPaid) {
            if (!window.Razorpay) {
                addRazorScript()
            } else {
                setSdkReady(true)
            }
        }


    }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo])


    const openRazorpay = () => {
        var options = {
            "key_id": "rzp_test_jK73NxdMXvCAls", // Enter the Key ID generated from the Dashboard
            "amount": order.razorpayAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Anand Fashion",
            "image": "https://example.com/your_logo",
            "order_id": order.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (paymentResult) {
                console.log(paymentResult)
                dispatch(payOrder(orderId, paymentResult))
            },
            "prefill": {
                "name": order.user.name,
                "email": order.user.email,
                "contact": "9999999999"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {

            alert(response.error.description);

        });

    }


    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    /*  const successPaymentHandler = (paymentResult) => {
         console.log(paymentResult)
         dispatch(payOrder(orderId, paymentResult))
     } */

    return loading ? (
        <Loader />
    ) : error ? (
        <Container id='mess'>
            <Message variant='danger'>{error}</Message></Container>
    ) : order ? (
        <><Container style={{ paddingTop: '120px' }}>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered {order.isDelivered}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid On {order.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/${item.gender}/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs.{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs.{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs.{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs.{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <Button
                                            disabled={order.paymentMethod === "COD"}
                                            type='button'
                                            className='btn-block'
                                            onClick={openRazorpay}
                                        >Pay</Button>
                                    )}
                                </ListGroup.Item>)}
                            <ListGroup.Item>
                                {order.paymentMethod === "COD" ? <h2>Your Order has been Confirmed!!</h2> : null}
                            </ListGroup.Item>
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button'
                                        className='btn-block'
                                        onClick={deliverHandler}>Mark As Delivered</Button></ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>

    ) : (<Loader />)
}

export default OrderScreen

