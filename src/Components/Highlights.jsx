/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'

const Highlights = () => {

	const [products, setProducts] = useState([])
	
	const dispatch = useDispatch()
	const addProduct = (product) => {
		dispatch(addCart(product))
	}


	useEffect(() => {
		const getProducts = async () => {
			await fetch(`${process.env.REACT_APP_URL}/product?amount[min]=1&limit=8`)
				.then(response => response.json())
				.then(json => {
					setProducts(json.results)
						
				})
				.catch(err => console.log(err))
		}
		getProducts()
	}, [])

	
   
	const ShowProducts = () => {
		return (
			<>
				{products.map((product) => {
					return (

						<div key={product.id} className='flex justify-center items-center'>
							<div key={product.id}>
								<div className='flex-shrink-0 mx-1 mb-6 relative overflow-hidden bg-white rounded-lg max-w-[280px] min-w-[280px] shadow-lg max-h-[320px] min-h-[320px]'>

									<div className="relative px-10 flex items-center justify-center ">
										<div className=" absolute w-36">
											<img className='object-fill h-36 w-36 justify-center mb-28' src={`http://lorempixel.com.br/500/400/?${product.id}`} />
										</div>
										<div className="relative px-6 mt-48">
											<div className=" justify-center items-center text-center">
												<span className=" font-header text-xl text-center">
													<div className="">{product.name.substring(0, 17)}</div>
												</span>


												<div className="bg-purple-300 rounded-md text-white text-base font-bold py-2 flex justify-center text-center w-48 mb-2 mt-2">${product.value}</div>
												<div className='h-1 w-2'></div>

												<div>
													<button className="px-10 py-2 text-base font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-verde rounded-md hover:bg-verde-escuro focus:outline-none focus:ring focus:ring-white focus:ring-opacity-80 focus:text-white font-header hover:text-white" onClick={() => addProduct(product)}>
													Adicionar ao Carrinho
													</button >

												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					)
				})}
			</>
		)
	}

	return (
		<div className='mt-2'>

            
			<div className='mx-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{<ShowProducts />}
			</div>

		</div>
	)
}

export default Highlights
