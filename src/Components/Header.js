import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'



import HeaderIcon from './HeaderIcon'


function Header() {
	return (

		<div>
			<>
				<div className="fixed w-full h-7 z-50 bg-purple-300 text-white text-center items-center justify-center">Frete Grátis para todo o Brasil!</div>


				<div className="fixed w-full mt-7 z-50 bg-white flex  items-center p-3 shadow-md">

					<div className=" mr-4 flex items-center font-marca text-3xl text-gray-700 sm:hidden">  <NavLink className="hover:text-gray-700" to="/">SN</NavLink> </div>

					<div className="hidden ml-2 sm:flex items-center font-marca text-2xl text-gray-700 ">  <NavLink className="hover:text-gray-700" to="/">ShopNalaura</NavLink> </div>

					<div className="text-lg flex justify-center items-center flex-grow  text-gray-700 space-x-3 sm:text-xl sm:space-x-8" >

						<div >  <NavLink className="hover:text-purple-500" to="/">Início</NavLink></div>
						<div > <NavLink className="hover:text-purple-500" to="/produtos">Produtos</NavLink></div>
						<div ><NavLink className="hover:text-purple-500" to="/historia">História</NavLink></div>


					</div>

					<div className="ml-1 flex items-center justify-end space-x-0 sm:space-x-0">

						<NavLink to="/login"><HeaderIcon Icon={UserIcon} /></NavLink>

						<NavLink className="flex" to="/carrinho">
							<HeaderIcon Icon={ShoppingCartIcon} /> </NavLink>

					</div>

				</div>
			</>
		</div>


	)
}

export default Header
