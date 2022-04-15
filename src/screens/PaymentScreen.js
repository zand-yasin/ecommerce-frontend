import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { register } from '../actions/userActions'
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [paymentMethod, setpaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!shippingAddress) navigate('/shipping')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'> Select Method </Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setpaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  checked
                  onChange={(e) => setpaymentMethod(e.target.value)}
                ></Form.Check> */}
              </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen
