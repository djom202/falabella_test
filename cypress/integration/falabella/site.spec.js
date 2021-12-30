describe('Falabella Site', () => {
    beforeEach(() => {
        cy.openFalabellaSite()

        Cypress.Cookies.defaults({
            preserve: ['session_id_fl_', 'userSessionId', 'remember_token'],
        })
        Cypress.Cookies.debug(true)
    })

    it('Form validation and User Sign up', () => {
        cy.get('.Popover-module_popover-container__3qpkj')
            .first()
            .click(12, 140) // this is the Register link

        cy.signUpUser()
    })

    it('User sign in', () => {
        cy.get('.Popover-module_popover-container__3qpkj')
            .first()
            .click(12, 100) // this is the Login link

        cy.loginInUser()
    })

    xit('User account', () => {
        cy.visit(
            '/falabella-cl/myaccount/login?successUrl=/myaccount/userPersonalInformation'
        )
    })
})
