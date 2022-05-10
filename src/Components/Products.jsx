import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'
import ReactPaginate from 'react-paginate'

//TODO: Fazer o loading

const Products = () => {

	const [products, setProducts] = useState([])
	const [pageCount, setPageCount] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [limitFilter, setLimitFilter] = useState(20)
	const [minValueFilter, setMinValueFilter] = useState(20000)
	const [nameFilter, setNameFilter] = useState('')
	const [categories, setCategories] = useState([])
	const [categoriesFilter, setCategoriesFilter] = useState(0)

	const dispatch = useDispatch()
	const addProduct = (product) => {
		dispatch(addCart(product))
	}

	useEffect(() => {
		const getProducts = async () => {

			const url = `${process.env.REACT_APP_URL}/product?page=${currentPage}&amount[min]=1&limit=${limitFilter}&value[max]=${minValueFilter}&name=${nameFilter}%${categoriesFilter === 0 ? '' : `&category_id=${categoriesFilter}`}` 

			await fetch(url)
				.then(response => response.json())
				.then(json => {
					setProducts(json.results)
					setPageCount(Math.ceil(json.total / limitFilter))
				})
				.catch(err => console.log(err))
		}
		getProducts()
	}, [currentPage, limitFilter, minValueFilter, categoriesFilter, nameFilter])

	useEffect(() => {
		const getCategories = async () => {
			await fetch(`${process.env.REACT_APP_URL}/category`)
				.then(response => response.json())
				.then(json => setCategories(json))
				.catch(err => console.log(err))
		}
		getCategories()
	}, [])

	useEffect(() => {
		setCurrentPage(0)
	}, [limitFilter, minValueFilter, categoriesFilter, nameFilter])

	const handlePageClick = (e) => {
		const selectedPage = e.selected
		setCurrentPage(selectedPage)
	}

	const ShowProducts = () => {
		return (
			<>
				{products.map((product) => {
					return (
						<div data-testid="cards" className='flex justify-center items-center' key={product.id}>
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
												<button data-testid="addCart" className="px-10 py-2 text-base font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-verde rounded-md hover:bg-verde-escuro focus:outline-none focus:ring focus:ring-white focus:ring-opacity-80 focus:text-white font-header hover:text-white" onClick={() => addProduct(product)}>
														Adicionar ao Carrinho
												</button >

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

	const ShowCategories = () => {
		return (
			<>

				<select value={categoriesFilter} data-testid="category" onChange={(e) => setCategoriesFilter(Number(e.target.value))} className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
					<option value={0}>Todos os Produtos</option>
					{categories.map((category) => {
						return <option key={category.id} value={category.id}> {category.name}</option>	
					})}
				</select>
			</>
		)
	}

	return (
		<div className='mt-36'>

			<div className='text-center my-5 font-header text-3xl text-gray-600 mt-10'><h1>Produtos</h1></div>

			<div className="flex relative justify-center mb-5">
				<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</span>
				<input type="text" placeholder="Busque aqui seu produto" data-testid="search-bar" onChange={(e) => setNameFilter(e.target.value)} className="text-center w-[30vw] rounded-r-lg appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent" />
			</div>

			<div className='flex items-center justify-center space-x-10 mb-5'>
				<div className='text-gray-700 text-base font-bold text-center'>
					Itens por página
					<select value={limitFilter} data-testid="limitFilter" onChange={(e) => setLimitFilter(Number(e.target.value))} className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
						<option value={8}>8</option>
						<option value={12}>12</option>
						<option value={16}>16</option>
						<option value={20}>20</option>
					</select>
				</div>

				<div className='text-gray-700 text-base font-bold text-center'>
					Valor máximo
					<select value={minValueFilter} data-testid="prices" onChange={(e) => setMinValueFilter(Number(e.target.value))} className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
						<option value={10}>10</option>
						<option value={100}>100</option>
						<option value={200}>200</option>
						<option value={500}>500</option>
						<option value={1000}>1000</option>
						<option value={5000}>5000</option>
						<option value={20000}>20000</option>

					</select>
				</div>

				<div className='text-gray-700 text-base font-bold text-center'>
					Categoria
					<ShowCategories />
				</div>

			</div>
			<div className='mx-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				<ShowProducts />
			</div>

			<div className='flex justify-center mt-10'>
				<ReactPaginate
					pageClassName={'container inline items-center'}
					pageLinkClassName={'inline-flex items-center px-4 py-2 mx-1 text-white text-base font-bold transition-colors duration-200 transform bg-white rounded-md sm:inline bg-purple-300 hover:bg-white hover:border border-purple-300 hover:text-purple-300'}
					previousClassName={'inline-flex items-center px-4 py-2 mx-1 text-white text-base font-bold bg-white rounded-md bg-purple-300 hover:bg-white hover:border border-purple-300 hover:text-purple-300'}
					nextClassName={'inline-flex items-center px-4 py-2 mx-1 text-white text-base font-bold bg-white rounded-md bg-purple-300 hover:bg-white hover:border border-purple-300 hover:text-purple-300 hover:text-white'}
					previousLabel={'Pagina anterior'}
					nextLabel={'Pagina seguinte'}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					forcePage={currentPage}
				/>
			</div>
		</div>
	)
}

export default Products