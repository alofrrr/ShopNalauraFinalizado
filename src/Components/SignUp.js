import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Logs from '../redux/login/log'
import { useHistory } from 'react-router-dom'

export function validateEmail (email) {
	const isEmailValid = typeof email === 'string' && email.includes('@')
	return isEmailValid 
}

export function validatePassword (password) {
	const isPasswordValid = typeof password === 'string' && password.length >= 6
	return isPasswordValid
}

export function validateName (nome) {
	const isNameValid = typeof nome === 'string' && nome !== ''
	return isNameValid
}

export function validateCpf (cpf) {
	const isCpfValid = typeof cpf === 'string' && cpf.length === 11
	return isCpfValid
}

export function validateNascimento (nascimento) {
	const isNascimentoValid = typeof nascimento === 'string' && nascimento.length === 10
	return isNascimentoValid
}

function SignUp() {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	let history = useHistory()


	function pagCad(e) {
		e.preventDefault()

		function cadastrando() {
			fetch('https://trainning-storeapp-gateway-dev-g5kv7eofma-uw.a.run.app/user', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
				.then((response) => {
					if (response.status === 201) {
						cadastrado()
					} else if(response.status === 400){
						response.json()
							.then((text) => {
								setError(text.errorMessage)
							})
					} else if (response.status === 409) {
						response.json()
							.then((text) => {
								setError(text.errorMessagePretty)
							})
					} else if (response.status === 500) {
						response.text()
							.then((text) => {
								setError(text)
							})
					}
				})
				.catch((error) => {
					console.log(error.message)
				})
		}

		cadastrando()

	}

	function cadastrado() {
		fetch('https://trainning-storeapp-gateway-dev-g5kv7eofma-uw.a.run.app/user/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})


			.then((response) => {
				const authorization = response.headers.get('Authorization')
				dispatchToken(authorization)
				history.push('/produtos')
			})
			.catch((error) => {
				console.log(error.message)
			})
	}

	

	function dispatchToken(authorization) {
		dispatch(Logs.login(authorization))
	}


	return (
		<div className="flex justify-center">
			<div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow d sm:px-6 md:px-8 lg:px-10">
				<div className="self-center mb-2 text-xl font-light text-gray-700 sm:text-3xl d">
					Realize seu cadastro
				</div>
				<span className="justify-center text-base text-center text-gray-500 flex-items-center dark:text-gray-400">
					Já possui uma conta ?
					<a href="/login" className="text-base text-purple-300 underline hover:text-purple-700">
						Login
					</a>
				</span>
				<div className="p-6 mt-4">
					<form onSubmit={pagCad}>

						<div className="flex flex-col mb-4">
							<div className=" relative ">
								<input type="text" id="cadastro-nome" data-testid="cadastro-nome" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" name="Nome" placeholder="Nome" autoComplete='on' required />
							</div>

						</div>
						<div className="flex flex-col mb-4">
							<div className=" relative ">
								<input type="email" id="cadastro-email" data-testid="cadastro-email" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" placeholder="E-mail" onChange={e => setEmail(e.target.value)} autoComplete='on' />
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className=" relative ">
								<input type="password" id="cadastro-senha" data-testid="cadastro-senha" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" placeholder="Senha"
									onChange={e => setPassword(e.target.value)} autoComplete='on' />
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className=" relative ">
								<input type="date" id="cadastro-nascimento" data-testid="cadastro-nascimento" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 decoration-gray-700 focus:ring-purple-300 focus:border-transparent" name="Nascimento" placeholder="Data de Nascimento" autoComplete='on' required />
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className=" relative ">
								<input type="text" id="cpf" data-testid="cadastro-cpf" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 decoration-gray-700 focus:ring-purple-300 focus:border-transparent" name="cpf" placeholder="CPF" autoComplete='off' required />

							</div>
						</div>
						<div className='px-1 items-center justify-center'>{error && <div className=' rounded-sm border-red-600 appearance-none border w-[17rem] py-2 px-2 text-center bg-red-300 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent'>{error}</div>}</div>



						<div className="flex w-full my-4 mt-6 mb-6">
							<button type="submit" id="button-cadastro" data-testid="button-cadastro" className="py-4 px-4  bg-purple-300 hover:bg-purple-400 focus:ring-purple-400 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
								Cadastre-se!
							</button>
						</div>
					</form>
					<div className="flex items-center justify-center mt-6">
						<div>
							<label className="flex items-center space-x-3 mb-3 mt-5">
								<input type="checkbox" name="checked-demo" className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-300 checked:border-transparent focus:outline-none" />
								<span className="text-gray-400 font-normal text-base">
									Gostaria de assinar a nossa Newsletter?
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SignUp