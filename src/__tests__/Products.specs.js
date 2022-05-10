import Products from '../Components/Products'
import helper from '../helper.json'
const nock = require('nock')
import React from 'react'
import { render, fireEvent, waitFor } from '../testUtils'
import handleCart from '../redux/reducer/handleCart'
import { addCart, delCart } from '../redux/action/index'


describe('Integration tests', () => {
	beforeEach(() => {
		nock.cleanAll()
	})



	it('search bar should return successfully', async () => {

		const { getByPlaceholderText, getByText} = render(<Products />, { route: '/produtos' })

		const mockedProducts = nock(process.env.REACT_APP_URL)
		.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
		.get('/product')
		.query(true)
		.reply(200, helper.primeiraPag)

		const name = 'Roasted' 

		fireEvent.change(getByPlaceholderText('Busque aqui seu produto'), { target: { value: name } })

		await waitFor(() => {
			expect(mockedProducts.isDone()).toBe(true)
			expect(getByText('Roasted Pecans'))})

	})

	it('must add a product to cart', () => {

		const cart = []
		const product = {cart: { product_id: 10}} 

		expect(handleCart(cart, addCart(product))).toEqual([{cart: {product_id: 10}, qty: 1}]) 
	}) 

	it('must del a product from cart', () => {

		const cart = [{product_id: 12, qty: 3},]

		expect(handleCart(cart,delCart(12))).toEqual( [{ product_id: 12, qty: 2 },],) 
	})
 
})
