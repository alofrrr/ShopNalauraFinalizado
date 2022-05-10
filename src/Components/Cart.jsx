import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCart, delCart, clearCart } from '../redux/action'
import { useHistory, NavLink } from 'react-router-dom'

const Cart = () => {

	const state = useSelector((state) => state.handleCart)
	const dispatch = useDispatch()
	const handleAdd = (item) => {
		dispatch(addCart(item))
	}
	const handleDel = (item) => {
		dispatch(delCart(item))
	}
	const handleClear = (item) => {
		dispatch(clearCart(item))
	}

	const token = useSelector((state) => state.login.token)
	const [balance, setBalance] = useState(0)
	const history = useHistory()
	const [orderSummaryOpened, isOrderSummaryOpened] = useState(false)
	const[insufficientBalance, setInsufficientBalance] = useState(false)

	
	
	useEffect(() => {
		const getBalance = async () => {
			if (token) {
				await fetch(`${process.env.REACT_APP_URL}/user`, {
					headers: {
						'content-type': 'application/json',
						authorization: token
					}
				})
					.then(response => response.json())
					.then(json => {
						setBalance(json.wallet)
					})
					.catch(err => console.log(err))
			} else if (token === ''){
				history.push('/login')
			}
		}
		getBalance()
	}, [balance])

	
	function purchase () {

		if(balance >= getPrice()){

			const purchaseProducts = () => {
				return state.map((product) => ({
					product_id: product.id,
					amount: product.qty
				}))
		
			}
	
			fetch(`${process.env.REACT_APP_URL}/purchase`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: token
				},
				body: JSON.stringify({
					products: purchaseProducts()
				})
			
				
			})
				.then((res) => res.json())
				.then((purchase) => {
					console.log('Purchase data', purchase)
					setBalance()
					isOrderSummaryOpened(true)
				
				})
		}else if (balance < getPrice()){
			setInsufficientBalance(true)
		}
	}

	const emptyCart = () => {
		return (
			<div className="mt-[36vh] mb-[28vh]">
				<div className="">
					<div className="text-2xl text-gray-600 mt-36 justify-center text-center items-center font-header max-w-full">
						<h3>Que pena, seu carinho está vazio!</h3>
					</div>
					<div className='items-center justify-center flex mt-5'>
						<NavLink className="text-gray-600 text-xl hover:text-purple-500" to="/meuspedidos">Ir para meus pedidos</NavLink>
					</div>
				</div>
			</div>
		)
	}

	const getPrice = () => {
		let subtotal = 0
		Array.from(state).forEach((product) => (subtotal += product.value * product.qty))
		return subtotal
	}

	const getTotalProducts = () => {
		let totalProducts = 0
		Array.from(state).forEach((product) => (totalProducts +=  product.qty))
		return totalProducts
	}

	

	const customCart = () => {
		return(
			<div className="justify-center items-center flex content-center">
			
				<div className='items-center w-[55vw] mt-20 justify-center pt-10 pb-10 content-center'>
					<div className="mb-10 text-gray-600 text-2xl font-semibold">
						<h3>Carrinho de Compras</h3>
					</div>

					<div className='flex mb-5'>
						<div className="ml-[8vw] text-gray-600 text-lg font-semibold">
							<h3>Produto</h3>
						</div>
						<div className="ml-[14vw] text-gray-600 text-lg font-semibold">
							<h3>Quantidade</h3>
						</div>
						<div className="ml-[16vw] text-gray-600 text-lg font-semibold">
							<h3>Preço</h3>
						</div>
					</div>
					<hr className='mr-4 ml-4'></hr>
					
				</div>
			</div>
		)
	}

	const customSummary = () => {
		return(
			<div className='w-[28rem] h-[29rem] mt-[14rem] mb-5 shadow-lg rounded-lg'>
				<div className='text-center mt-5 text-gray-600 text-2xl font-semibold'>
					<p >Resumo do Pedido</p>
				</div>

				<div className='flex text-xl font-medium mt-8 space-x-16'>
					<div className='w-[8rem] flex justify-start ml-14'>
						{getTotalProducts()} produto(s) 
					</div>

					<div className='w-[8rem] flex justify-end mr-14'>
							R$ {getPrice()}
					</div>
				</div>

				<div className='flex text-xl font-medium mt-8 space-x-16'>
					<div className='w-[8rem] flex justify-start ml-14'>
							Saldo
					</div>

					<div className='w-[8rem] flex justify-end mr-14'>
							R$ {balance}
					</div>
				</div>

				<hr className='m-6'></hr>

				<div className='flex text-base font-medium mt-8'>
					<div className='w-[8rem] flex justify-start ml-14'>
							Nome:
					</div>

					<div className='w-[8rem] flex justify-end ml-14'>
							XXXXXXXXXXXX
					</div>
				</div>

				<div className='flex text-base font-medium'>
					<div className='w-[8rem] flex justify-start ml-14'>
							Enviar para:
					</div>

					<div className='w-[8rem] flex justify-end ml-14'>
						XXXXXXXXXXXX
					</div>
				</div>

				<div className='flex text-base font-medium'>
					<div className='w-[8rem] flex justify-start ml-14'>
							Frete
					</div>

					<div className='w-[8rem] flex justify-end ml-14'>
						XXXXXXXXXXXX
					</div>
				</div>

				<div className='items-center justify-center flex mt-10'>
					<button className="bg-transparent hover:bg-purple-500 text-xl text-purple-500 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded" onClick={purchase}>Efetuar Pedido</button>
				</div>

				<div className='items-center justify-center flex mt-3'>
					<NavLink className="hover:text-purple-500" to="/produtos">Adicionar mais produtos?</NavLink>
					
				</div>
				<div className='items-center justify-center flex mb-3'>
					<NavLink className="hover:text-purple-500" to="/meuspedidos">Ir para meus pedidos</NavLink>
				</div>
			</div>
			
		)
	}
	
	const cartItems = (product) => {

		return (
			<>
				<div className="flex bg-white rounded-lg shadow w-[55vw] mb-5 h-[15vh]">
					
					<div className="ml-[2vw] flex-none w-28 relative items-center z-10">
						<img src={`http://lorempixel.com.br/500/400/?${product.id}`} className="rounded-lg object-fill" />
					</div>
					
					<div className="ml-[1vw] w-[31vh] mt-7 flex flex-wrap">
						<h1 className="flex-auto text-xl font-semibold dark:text-black">
							{product.name}
						</h1>
						
						<div className="w-full flex-none text-base mb-9 font-medium text-gray-600 ">
                                Disponivel em Estoque: {product.amount}
						</div>
					</div>
					<div className="flex items-baseline mt-[4vh] mb-6 text-gray-700 dark:text-gray-300">
						<div className="space-x-2 flex">
							<div className="flex items-center">
								<button type="button" data-testid="removeCart" onClick={() => handleDel(product)} className="w-full border-l border-t border-b text-xl font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
                                        -
								</button>
								<h2 className="ml-auto text-xl text-gray-600 border px-4 py-2">
									{product.qty}
								</h2>
								<button type="button" data-testid={ `increaseCart-${ product.id }` } onClick={() => handleAdd(product)} className="w-full rounded-r-md border text-xl font-medium text-black bg-white hover:bg-gray-100 px-4 py-2">
                                        +
								</button>
							</div>
						</div>
					</div>
						

					<div className="text-xl ml-[15vw] mt-[5vh] font-semibold text-gray-600">
                                R$ {product.qty * product.value}
					</div>

					
					
				</div>
				
			</>
		)
	}

	const printOrderSummary = () => {
		const showOrders = (product) =>{
			return(
				<div className='ml-12 text-lg font-medium text-gray-600'>
					<hr className='mr-12'></hr>
					<div className="flex">

						<div className="">
							{product.qty}
						</div>
						<h1 className="ml-7 w-56">
							{product.name}
						</h1>
						
						<div className="">
							R$ {product.qty * product.value}
						</div>
					</div>
				</div>
			)
		}
		const close = () =>{
			isOrderSummaryOpened(false)
			handleClear()
		}
		return(
			<>
				<div className='z-20 bg-white bg-opacity-75 fixed w-[100vw] h-[100vh] flex justify-center'>
					<div className='z-1 mt-40 fixed w-[30rem] h-auto bg-white inline-block shadow-sombraBox'>
						<button className='ml-[28rem] mt-3 text-2xl hover:text-purple-600 ' onClick={() => {close()}}>X</button>
						<div className='text-3xl text-gray-600 text-center font-semibold'>Ebaaaa!</div>
						<div className='text-xl mt-3 text-gray-600 text-center font-semibold'>Estamos processando seu pedido e em breve ele estará em suas mãos =) </div>
				
						<div className='text-lg mt-3 ml-7 text-gray-600 font-semibold'>Sua comprinha: </div>
						<div className='mt-5'>
							{state.map(showOrders)}
						</div>
						<hr className='ml-12 mr-12 mb-5'></hr>
						<div className='text-lg mt-3 text-center text-gray-600 font-semibold'>
						Total pago: {getPrice()}
						</div>
						<div className='text-lg mb-10 text-center text-gray-600 font-semibold'>
						Saldo restante: {balance}
						</div>
						
					</div>
				</div>

			</>
		)
	}

	const printInsufficientBalance = () => {
		
		return(
			<>
				<div className='z-20 bg-white bg-opacity-75 fixed w-[100vw] h-[100vh] flex justify-center'>
					<div className='z-1 mt-56 fixed w-[30rem] h-auto bg-white inline-block shadow-sombraBox'>
						<button className='ml-[28rem] mt-3 text-2xl hover:text-purple-600 ' onClick={() => {setInsufficientBalance(false)}}>X</button>
						<div className='text-3xl text-gray-600 text-center font-semibold'>Poxa!</div>
						<div className='text-xl mt-3 mb-7 text-gray-600 text-center font-semibold'> Saldo insuficiente para esta compra =( </div>
						
					</div>
				</div>

			</>
		)
	}


	return (
		<div className=''>
			<div className='flex justify-center'>
				{orderSummaryOpened && printOrderSummary()}
				{insufficientBalance && printInsufficientBalance()}

			</div>
			<div className='flex space-x-16'>
				<div>
					{state.length !== 0 && customCart()}
					{state.length === 0 && emptyCart()}
					{state.length !== 0 && state.map(cartItems)}
					
				</div>	

				{state.length !== 0 && customSummary()}
			</div>
		
			
		</div>
	)
}

export default Cart
