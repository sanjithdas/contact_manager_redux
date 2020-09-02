import {createStore , applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension' ;
import thunk from 'redux-thunk'; //async actions
import rootReducer from './reducers/rootReducer.js'
/**
 * create initialState - empty object
 */
const initialState = {};
const middleware = [thunk];
/**
 * thunk - is middleware
 * create a store to  hold our state.
 */
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
