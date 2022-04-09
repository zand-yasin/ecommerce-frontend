import { createStore, combineReducers, applyMiddleware } from 'redux'

// create store : for creating store
// combinereducer: we have a bunch of reducers each one stands for a specific functionality ex for a productList (fetch products, sucessfull req, fail req )
// apply middleware: for middlewares like thunk
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})
const initialState = {}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
