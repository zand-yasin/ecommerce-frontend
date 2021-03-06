import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
// import history from '../components/MyHistory'
import { useNavigate } from 'react-router-dom'

const ProductScreen = () => {
  const [quantity, setquantity] = useState(1)
  const navigate = useNavigate()

  const { id } = useParams()
  const dispatch = useDispatch()

  // getting actual data from the state bu using (useselector)
  // productList you can chonse any variable name but we follow samething as store.js
  const productDetails = useSelector((state) => state.productDetails)
  // get 3 state of each action result ex we have get needed reducer attributes from productReducers
  const { loading, error, product } = productDetails

  useEffect(() => {
    // dispatching to actions which is list product acion for (fetching data from backend)
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    console.log(111111111)

    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>{product.name}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews `}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: {product.price}</ListGroup.Item>
              <ListGroup.Item>Price: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong> ${product.price} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={(e) => setquantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Card
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
