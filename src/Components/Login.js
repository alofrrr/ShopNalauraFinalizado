import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Logs from '../redux/login/log'
import { useHistory } from 'react-router-dom'


export function validateFields (email, password) {
	const isEmailValid = typeof email === 'string' && email.includes('@')
	const isPasswordValid = typeof password === 'string' && password.length >= 6
	return isEmailValid && isPasswordValid
}

function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	let history = useHistory()
	const dispatch = useDispatch()

	async function login(e) {
		e.preventDefault()

		await fetch(`${process.env.REACT_APP_URL}/user/login`, {
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
				if (response.status === 200) {
					dispatchToken(authorization)
					history.push('/produtos')
				} else if (response.status === 400) {
					response.json()
						.then((text) => {
							setError(text.errorMessage)
						})
				} else if (response.status === 401) {
					response.text()
						.then((text) => {
							setError(text)
						})
				}
				else if (response.status === 500) {
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


	function dispatchToken(authorization) {
		dispatch(Logs.login(authorization))
	}

	return (
		<div className='container max-w-full'>
			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md sm:px-6 md:px-8 lg:px-10 ">
					<div className="self-center mb-4 text-xl font-light text-gray-600 sm:text-3xl ">
					Entre na sua conta
					</div>
					<div className="mt-8 items-center justify-center">

						<form onSubmit={login}>

							<div className="flex flex-col mb-2">
								<div className="flex relative ">
									<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
										<svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
											<path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
											</path>
										</svg>
									</span>
									<input type="email" id="email" data-testid="login-email" onChange={e => setEmail(e.target.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" placeholder="E-mail" autoComplete='on' />
								</div>
							</div>
							<div className="flex flex-col mb-6">
								<div className="flex relative ">
									<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
										<svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
											<path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
											</path>
										</svg>
									</span>
									<input type="password" id="password" data-testid="login-senha" onChange={e => setPassword(e.target.value)} className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" placeholder="Sua senha" />
								</div>
								
							</div>
							<div className="flex items-center mb-10 -mt-2">
								<div className="flex ml-auto">
									<a href="/" className="inline-flex text-xs font-thin text-gray-500 sm:text-base  hover:text-gray-700 ">
									Esqueceu sua senha?
									</a>
								</div>
							</div>
							<div className='px-12 mb-6 -mt-4 items-center justify-center'>{error && <div className=' rounded-sm border-red-600 appearance-none border w-[17rem] py-1 px-2 text-center bg-red-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent'>{error}</div>}</div>

							<div className="flex w-full">
								<button type="submit" value="LOGIN" id="button-login" data-testid="button-login" className="py-3 px-4  bg-purple-300 hover:bg-purple-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
								Login
								</button>
							</div>
						</form>
					</div>
					<div className="flex items-center justify-center mt-6">
						<a href="/cadastro" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 ">
							<span className="ml-2 text-base">
							Não possui cadastro?
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>

	)
} export default Login