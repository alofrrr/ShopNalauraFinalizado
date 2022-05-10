
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
      
	
	it('should login the user succesfully', () => {

		cy.intercept('POST', 'https://trainning-storeapp-gateway-dev-g5kv7eofma-uw.a.run.app/user/login', {statusCode: 200}).as('stubPost')
    
		cy.visit('/login')

		cy.get('[data-testid=login-email]').type( 'admin@gmail.com' )
		cy.get('[data-testid=login-senha]').type( '123456' )
	
		cy.get('[data-testid=button-login]').click()

		cy.wait('@stubPost')

		cy.url({ timeout: 10000 }).should('match', /produtos/)

	})

	it('should return that the informed e-mail is invalid', () => {
    
		cy.visit('/login')

		
		cy.get('[data-testid=login-email]').type( makeid(10) + '@1' )
		cy.get('[data-testid=login-senha]').type( '123456' )

		cy.get('[data-testid=button-login]').click()

		cy.contains('"email" must be a valid email')
	})

	it('should return that the informed user not found', () => {
    
		cy.visit('/login')

		cy.get('[data-testid=login-email]').type( 'a15@gmail.com' )
		cy.get('[data-testid=login-senha]').type( '123456' )

		cy.get('[data-testid=button-login]').click()

		cy.contains('Usuário não encontrado.')
	})

	it('should return that the informed incorrect password', () => {
    
		cy.visit('/login')

		cy.get('[data-testid=login-email]').type( 'admin@gmail.com' )
		cy.get('[data-testid=login-senha]').type( '1234567' )

		cy.get('[data-testid=button-login]').click()

		cy.contains('Senha incorreta.')
	})

	it('should return that the password does not fullfil the requirement', () => {

		cy.visit('/login')


		cy.get('[data-testid=login-email]').type( 'admin@gmail.com' )
		cy.get('[data-testid=login-senha]').type( '123' )
		

		cy.get('[data-testid=button-login]').click()


		cy.contains('"password" length must be at least 6 characters long')

	})

	
})
