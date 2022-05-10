
import { validateEmail, validatePassword, validateName, validateCpf, validateNascimento } from '../Components/SignUp'
import SignUp from '../Components/SignUp'
const nock = require('nock')
import React from 'react'
import { render, fireEvent, waitFor } from '../testUtils'

function makeid(length) {
	var result = ''
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}


describe('Unit tests', () => {
	test('it should validate Email successfully', () => {
		const response = validateEmail('email@email.com')
		expect(response).toBe(true)
	})

	test('it should validate password successfully', () => {
		const response = validatePassword('123456')
		expect(response).toBe(true)
	})

	test('it should validate name successfully', () => {
		const response = validateName('Robervaldo')
		expect(response).toBe(true)
	})

	test('it should validate Cpf successfully', () => {
		const response = validateCpf('11111111111')
		expect(response).toBe(true)
	})

	test('it should validate Nascimento successfully', () => {
		const response = validateNascimento('05/07/1966')
		expect(response).toBe(true)
	})
})

describe('Integration tests', () => {
	beforeEach(() => {
		nock.cleanAll()
	})

	test('it must register the user successfully', async () => {
		const user = {
			email: makeid(10) + '@ashjda.com',
			password: 'password'
		}
		console.log('First test user', user)

		const mockedSignUp = nock(process.env.REACT_APP_URL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.post('/user', { email: user.email, password: user.password })
			.reply(200, { authorization: 'Bearer token' })


		const { getByPlaceholderText, getByTestId } = render(<SignUp />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('Nome'), { target: { value: 'Robervaldo' } })
		fireEvent.change(getByPlaceholderText('E-mail'), { target: { value: user.email } })
		fireEvent.change(getByPlaceholderText('Senha'), { target: { value: user.password } })
		fireEvent.change(getByPlaceholderText('Data de Nascimento'), { target: { value: '05/07/1966' } })
		fireEvent.change(getByPlaceholderText('CPF'), { target: { value: '11111111111' } })
		fireEvent.click(getByTestId('button-cadastro'))

		await waitFor(() => expect(mockedSignUp.isDone()).toBe(true))

	})

	it('it should fail to register with an invalid email', async () => {
		const user = {
			email: 'admin@gmail.com',
			password: '123456',
		}

		const mockedSignUp = nock(process.env.REACT_APP_URL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.post('/user', { email: user.email, password: user.password })
			.reply(409, { authorization: 'Bearer token' })

		const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('Nome'), { target: { value: 'Robervaldo' } })
		fireEvent.change(getByPlaceholderText('E-mail'), { target: { value: user.email } })
		fireEvent.change(getByPlaceholderText('Senha'), { target: { value: user.password } })
		fireEvent.change(getByPlaceholderText('Data de Nascimento'), { target: { value: '05/07/1966' } })
		fireEvent.change(getByPlaceholderText('CPF'), { target: { value: '11111111111' } })
		fireEvent.click(getByTestId('button-cadastro'))

		await waitFor(() => expect(mockedSignUp.isDone()).toBe(true))
	})

	it('it should fail to register with an invalid password', async () => {
		const user = {
			email: makeid(10) + '@ashjda.com',
			password: '123', 
		}

		const mockedSignUp = nock(process.env.REACT_APP_URL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.post('/user', { email: user.email, password: user.password })
			.reply(400, { authorization: 'Bearer token' })

		const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />, { route: '/login' })

		fireEvent.change(getByPlaceholderText('E-mail'), { target: { value: user.email } })
		fireEvent.change(getByPlaceholderText('Senha'), { target: { value: user.password } })
		fireEvent.click(getByTestId('button-cadastro'))
		
		await waitFor(() => expect(mockedSignUp.isDone()).toBe(true))
	})

})