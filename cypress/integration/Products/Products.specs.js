
describe('E2E tests', () => {
	function makeid (length) {
		var result = ''
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		var charactersLength = characters.length
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}
		return result
	}
      
	it('should display products with the max price of 10, search products and add products to the cart ', () => {
    
		cy.visit('/produtos')

		cy.get('[data-testid="prices"]').select('10')
		cy.get('[data-testid=search-bar]', { setTimeout: 10000 }).type('Roasted')
		cy.get('[data-testid=addCart]').click({force: true})

		cy.visit('/carrinho')

	})


	it('register the user, change prices, add and remove products in the cart', () => {

		cy.visit('/cadastro')

		cy.get('[data-testid=cadastro-nome]').type( 'Robervaldo' )
		cy.get('[data-testid=cadastro-email]').type( makeid(10) + '@gmail.com' )
		cy.get('[data-testid=cadastro-senha]').type( '123456' )
		cy.get('[data-testid=cadastro-nascimento]').type( '1966-07-05' )
		cy.get('[data-testid=cadastro-cpf]').type( '1111111111' )

		cy.get('[data-testid=button-cadastro]').click()

		cy.get('[data-testid="prices"]').select('10')
		cy.get('[data-testid=search-bar]', { setTimeout: 10000 }).type('Roasted')
		cy.get('[data-testid=addCart]').click({force: true})

		cy.visit('/login')

		cy.get('[data-testid=login-email]', { setTimeout: 10000 }).type( 'admin@gmail.com' )
		cy.get('[data-testid=login-senha]', { setTimeout: 10000 }).type( '123456' )
		cy.get('[data-testid=button-login]').click()
        
		cy.visit('/carrinho')

		cy.get('[data-testid=removeCart]', { setTimeout: 10000 }).click()

		cy.contains('Que pena, seu carinho está vazio!')

	})
})
