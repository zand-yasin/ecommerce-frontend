import React, { useEffect } from 'react'
// usedispatch: for calling action
// useselecter: for select a part of the state ex(productList is a part of the state)
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
const HomeScreen = () => {
  const dispatch = useDispatch()

  // getting actual data from the state bu using (useselector)
  // productList you can chonse any variable name but we follow samething as store.js
  const productList = useSelector((state) => state.productList)
  // get 3 state of each action result ex we have get needed reducer attributes from productReducers
  const { loading, error, products } = productList

  useEffect(() => {
    // dispatching to actions which is list product acion for (fetching data from backend)
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
