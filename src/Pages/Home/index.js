import Slider from '../../Components/Slider/Slider'
import { TruckIcon } from '@heroicons/react/outline'
import { CurrencyDollarIcon } from '@heroicons/react/outline'
import { RefreshIcon } from '@heroicons/react/outline'
import HeaderIcon from '../../Components/HeaderIcon'
import React from 'react'
import Highlights from '../../Components/Highlights'

function Home() {
	return (
		<div>

    
			<Slider />

			<div className="mt-4 mb-6 w-full bg-white flex space-x-14 justify-center">

				<div className="text-lg w-100 font-header items-center text-center  text-gray-700">
					<HeaderIcon Icon={TruckIcon} />
					<h1>FRETE GRÁTIS</h1>
					<h4>Para todo o Brasil!</h4>
				</div>
				<div className="text-lg  w-100 font-header items-center text-center  text-gray-700">
					<HeaderIcon Icon={CurrencyDollarIcon} />
					<h1>DESCONTO NO PIX</h1>
					<h4>5% de desconto no PIX!</h4>
				</div>
				<div className="text-lg w-100 font-header items-center text-center text-gray-700">
					<HeaderIcon Icon={RefreshIcon} />
					<h1>NÃO DEU CERTO?</h1>
					<h4>Estornamos sua compra!</h4>

				</div>

			</div>

			<div className="justify-center text-3xl text-center pb-4 text-gray-700 font-semibold"><h1>Destaques</h1></div>

			<Highlights />



		</div>
	)
}

export default Home