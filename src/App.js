import './App.css'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import SignUp from './Pages/SignUp/index'
import Home from './Pages/Home/index'
import Login from './Pages/Login'
import About from './Pages/About'
import Products from './Pages/Products/index'
import Footer from './Components/Footer'
import Cart from './Pages/Cart/index'
import Checkout from './Pages/Checkout'
import Orders from './Pages/Orders'

function App() {

	return (
		<div>
			<>
				<div className='mt-0 flex'><Header /></div>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/cadastro" component={SignUp} />
					<Route exact path="/historia" component={About} />
					<Route exact path="/produtos" component={Products} />
					<Route exact path="/carrinho" component={Cart} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/meuspedidos" component={Orders} />
				</Switch>

			<Footer />
			</>

		</div>
	)
}

export default App
