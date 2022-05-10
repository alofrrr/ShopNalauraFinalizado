/* eslint-disable no-undef */
import React from 'react'


function About() {
	return <div>

		<div className="bg-white overflow-hidden relative mx-28 mt-4 lg:mx-80">
			<div className="text-start w-1/2 py-12 px-4 lg:py-16 lg:px-8 z-20">
				<h2 className=" text-gray-800">
					<div className="text-6xl text-marca mb-4">
                História
					</div>
					<div className="text-gray-600 text-marca text-3xl mb-4">
                ShopNalaura
					</div>
				</h2>
				<p className="text-2xl mt-4 text-gray-500 mb-1">
           A ShopNalaura surgiu de um processo seletivo para a empresa tech Liven. Um projeto desafiador, visto que eu ainda não havia tido contato com algumas tecnologias. O que impulsionou ainda mais minha vontade de entregar o meu melhor. Cada Div deste projeto foi minimamente pensada para que o resultado final ficasse não só funcional como um lindo site.  
				</p>
				<div className="lg:mt-0 lg:flex-shrink-0">
           
				</div>
			</div>
			<img src={process.env.PUBLIC_URL + '/Imgs/Nalaura.png'} alt='nalaura' className="absolute h-full max-w-1/2 hidden lg:block right-0 top-0"/>
		</div>



	</div>
}

export default About
