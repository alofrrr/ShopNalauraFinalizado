import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function Orders() {

	const token = useSelector((state) => state.login.token)
	const [orders, setOrders] = useState([])
	const history = useHistory()

	useEffect(() => {
		const getAllOrders = async () => {
			if (token) {
				await fetch(`${process.env.REACT_APP_URL}/purchase/user`, {
					headers: {
						'content-type': 'application/json',
						authorization: token
					}
				})
					.then(response => response.json())
					.then(purchases => {
						return Promise.all(purchases.map(async (purchase) => {
							const productsWithName = await Promise.all(purchase.products.map(async (product) => {
								const name = await fetchProductNameById(product.product_id)
								return {
									...product,
									name
								}
							}))
							return {
								...purchase,
								products: productsWithName
							}
						}))
					})
					.then(json => {
						setOrders(json.reverse())
					})

					.catch(err => console.log(err))
			} else if (token === '') {
				history.push('/login')
			}
		}
		getAllOrders()
	}, [orders])

	const fetchProductNameById = async (productId) => {
		return fetch(`${process.env.REACT_APP_URL}/product/${productId}`)
			.then(res => res.json())
			.then(json => {
				return json.name
			})
			.catch(error => console.log(error))
	}

	const getPrice = order => {
		let subtotal = 0
		order.products.forEach((product) => (subtotal += product.value * product.amount))
		return subtotal
	}

	const getDate = order => {
		const date = new Date(order.created_at)
		const formatedDate = date.toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric' })
		return formatedDate
	}
	
	const ShowOrder = ({ order }) => {
		return (
			<>
				<div className='bg-white rounded-lg shadow w-[55rem] mb-5 h-auto justify-center items-center'>
					<div className='h-3'></div>
					<div className='flex space-x-[30rem] ml-12'>
						<div className='h-10 justify-start text-2xl text-gray-600'>Pedido {order.id}</div>
						<div className='justify-end text-xl text-gray-600'>{getDate(order)}</div></div>

					<div className='text-gray-600 ml-20 text-xl mb-3'>Produtos:</div>
					<div className='text-gray-500 mb-5 text-lg'>{order.products.map(product =>{
						return(<div key={product} >
							<div  className='flex text-center ml-14'>
								<div className='w-72' >- Nome: {product.name}</div>
								<div className='w-72'>Quantidade: {product.amount }</div>
								<div className='w-72'>Valor: R$ {product.amount * product.value}</div>

							</div>
							<hr className='ml-16 mr-16'></hr>
						</div>

						)
					})} </div>
					<div className='text-gray-600 text-xl text-center'>Valor da compra: R$ {getPrice(order)}</div>

					<div className='h-3'></div>
				</div>

			</>
		)
	}

	return (

		<div className=''>
			<h1 className='text-3xl text-center mb-5 font-medium text-gray-600'>Meus Pedidos</h1>
			<div className='justify-center'>


				{orders.map(order => (
					<ShowOrder key={order.id} order={order} />
				))}

			</div></div>
	)
}

export default Orders
