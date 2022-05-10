
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
      
	
	it('should register the user succesfully', () => {

		cy.intercept('POST', 'https://trainning-storeapp-gateway-dev-g5kv7eofma-uw.a.run.app/user/login', {statusCode: 200}).as('stubPost')
    
		cy.visit('/cadastro')

		cy.get('[data-testid=cadastro-nome]').type( 'Robervaldo' )
		cy.get('[data-testid=cadastro-email]').type( makeid(10) + '@gmail.com' )
		cy.get('[data-testid=cadastro-senha]').type( '123456' )
		cy.get('[data-testid=cadastro-nascimento]').type( '1966-07-05' )
		cy.get('[data-testid=cadastro-cpf]').type( '1111111111' )

		cy.get('[data-testid=button-cadastro]').click()

		cy.wait('@stubPost')

		cy.url({ timeout: 10000 }).should('match', /produtos/)

	})

	it('should return that the informed e-mail is invalid', () => {
    
		cy.visit('/cadastro')

		cy.get('[data-testid=cadastro-nome]').type( 'Robervaldo' )
		cy.get('[data-testid=cadastro-email]').type( makeid(10) + '@3443' )
		cy.get('[data-testid=cadastro-senha]').type( '123456' )
		cy.get('[data-testid=cadastro-nascimento]').type( '1966-07-05' )
		cy.get('[data-testid=cadastro-cpf]').type( '1111111111' )

		cy.get('[data-testid=button-cadastro]').click()

		cy.contains('"email" must be a valid email')

	})

	it('should return that the password does not fullfil the requirement', () => {
    
		cy.visit('/cadastro')

		cy.get('[data-testid=cadastro-nome]').type( 'Robervaldo' )
		cy.get('[data-testid=cadastro-email]').type( makeid(10) + '@gmail.com' )
		cy.get('[data-testid=cadastro-senha]').type( '123' )
		cy.get('[data-testid=cadastro-nascimento]').type( '1966-07-05' )
		cy.get('[data-testid=cadastro-cpf]').type( '1111111111' )

		cy.get('[data-testid=button-cadastro]').click()

	
		cy.contains('"password" length must be at least 6 characters long')

	})

	it('must register the user, visit products and set the maximum price of 10', () => {
    
		cy.visit('/cadastro')

		cy.get('[data-testid=cadastro-nome]').type( 'Robervaldo' )
		cy.get('[data-testid=cadastro-email]').type( makeid(10) + '@gmail.com' )
		cy.get('[data-testid=cadastro-senha]').type( '123456' )
		cy.get('[data-testid=cadastro-nascimento]').type( '1966-07-05' )
		cy.get('[data-testid=cadastro-cpf]').type( '1111111111' )

		cy.get('[data-testid=button-cadastro]').click()

		cy.url({ timeout: 10000 }).should('match', /produtos/)

		cy.get('[data-testid="prices"]').select('10')
		
	})

})
