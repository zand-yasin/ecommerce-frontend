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
import { cardReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cardReducer,
  userLogin: userLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
