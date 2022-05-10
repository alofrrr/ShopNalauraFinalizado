import handleCart from './handleCart'
import login from '../login/reducer'
import { combineReducers } from 'redux'


const rootReducers = combineReducers({
	handleCart,
	login
})

export default rootReducers