/* eslint-disable no-case-declarations */
const cart = []

const handleCart = (state = cart, action) => {
	const product = action.payload
	switch (action.type) {
	case 'ADDITEM':
		const addItem = state.find((item) => item.id === product.id)
		if (addItem) {
			return state.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
		} else {
			const product = action.payload
			return [
				...state,
				{
					...product,
					qty: 1,
				}
			]
		}
		

	case 'DELITEM':
		const delItem = state.find((item) => item.id === product.id)
		if (delItem.qty === 1) {
			return state.filter((item) => item.id !== delItem.id)
		} else {
			return state.map((item) => item.id === product.id ? { ...item, qty: item.qty - 1} : item 
			)
		}

	case 'CLEARCART':
		return cart
		
	default:
		return state
		
	}
}



export default handleCart