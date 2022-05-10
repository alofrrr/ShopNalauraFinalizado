import { validateFields } from '../Components/Login'
import Login from '../Components/Login'
const nock = require('nock')
import React from 'react'
import { render, fireEvent, waitFor } from '../testUtils' 

describe('Unit tests', () => {
	test('it should validate body successfully', () => {
		const response = validateFields('email@email.com', 'password')
		expect(response).toBe(true)
	})
  
	test('it should fail to validate body when email is not valid', () => {
		const response = validateFields('email', 'password')
		expect(response).toBe(false)
	})
})

describe('Integration tests', () => {
	beforeEach(() => {
		nock.cleanAll()
	})

	test('it must login the user successfully', async () => {
		const user = {
			email: 'admin@gmail.com',
			password: '123456',
		}
		
		const mockedLogin = nock(process.env.REACT_APP_URL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.post('/user/login', { email: user.email, password: user.password })
			.reply(200, { authorization: 'Bearer token' })
			

		const { getByPlaceholderText, getByTestId } = render(<Login />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('E-mail'), {target: { value: user.email }})
		fireEvent.change(getByPlaceholderText('Sua senha'), {target: { value: user.password }})
		fireEvent.click(getByTestId('button-login')) 

		await waitFor(() => expect(mockedLogin.isDone()).toBe(true))
	
	})

	it('it should fail to login with an invalid email', async () => {
		const user = {
			email: 'admin',
			password: '123456',
		}
			
		const mockedLogin = nock(process.env.REACT_APP_URL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.post('/user/login', { email: user.email, password: user.password })
			.reply(400, { authorization: 'Bearer token' })

		const { getByPlaceholderText, getByTestId, getByText } = render(<Login />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('E-mail'), {target: { value: user.email }})
		fireEvent.change(getByPlaceholderText('Sua senha'), {target: { value: user.password }})
		fireEvent.click(getByTestId('button-login'))

		await waitFor(() => expect(mockedLogin.isDone()).toBe(true))
	})

	it('it should fail to login with invalid an password', async () => {
		const user = {
			email: 'admin@gmail.com',
			password: '123',
		}

		const mockedLogin = nock(process.env.REACT_APP_URL)
		.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
		.post('/user/login', { email: user.email, password: user.password })
		.reply(400, { authorization: 'Bearer token' })

		const { getByPlaceholderText, getByTestId, getByText } = render(<Login />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('E-mail'), {target: { value: user.email }})
		fireEvent.change(getByPlaceholderText('Sua senha'), {target: { value: user.password }})
		fireEvent.click(getByTestId('button-login'))
		await waitFor(() => expect(mockedLogin.isDone()).toBe(true))
	})

})
  
  
  