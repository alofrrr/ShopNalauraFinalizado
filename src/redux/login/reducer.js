import { createReducer } from '@reduxjs/toolkit'
import {
	login,
	logout
} from './log'

const defaultLoginState = {
	isLogin: false,
	token: ''
}

const user = createReducer(defaultLoginState, {
	[login]: (state = defaultLoginState, action) => {
		return {
			...state,
			isLogin: true,
			token: action.payload
		}
	},
	[logout]: (state) => {
		return {
			...state,
			isLogin: false,
			token: ''
		}
	}
})

export default user
