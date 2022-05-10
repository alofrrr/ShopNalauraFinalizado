import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import allReducers from './redux/reducer'
import { createMemoryHistory } from 'history'

function render(
	ui,
	{
		route = '/',
		state = null,
		history = createMemoryHistory({
			initialEntries: [
				{
					pathname: route,
					state: state,
				},
			],
		}),
		store = createStore(allReducers),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<Router history={history}>
					{children}
				</Router>
			</Provider>
		)
	}
	return {
		...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
		history,
		store,
	}
}

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { render }
