import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [redirectParams, setredirectParams] = useSearchParams()
  let redirect = redirectParams.get('redirect')

  if (!redirect) redirect = '/login'

  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH LOGIN

    dispatch(login(email, password))
  }

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='emial'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>

          <Row className='py-3'></Row>
          <Col>
            New Customer
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            ></Link>
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
