// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logDebug', (body) => {
    // console.log(body)
    // console.log('data.length', body.data.length)
    // console.log('per_page', body.per_page)
    // console.log('from', body.from)
    // console.log('to', body.to)

    return Cypress.log({
        name: 'debug',
        displayName: 'debug',
        message: `${body.data}`,
        consoleProps: () => {
            return {
                Body: body,
                Data: body.data.length,
                PerPage: body.per_page,
                From: body.from,
                To: body.to,
            }
        },
    })
})

Cypress.Commands.add('openFalabellaSite', () => {
    cy.viewport('macbook-13')
    cy.visit('www.falabella.com')
    cy.wait(200)
    cy.get('.dy-lb-close').click()
    return cy
        .get('.Popover-module_popover-container__3qpkj')
        .first()
        .trigger('mouseover')
})

Cypress.Commands.add('signUpUser', () => {
    let idx = Math.floor(Math.random() * (20 + 1 - 1) + 1)
    let seed = Math.floor(Math.random() * (5000 + 1 - 1000) + 1000)

    cy.fixture('users').should((users) => {
        cy.get('#testId-Input-firstName').type(users[idx].name)
        cy.get('#testId-Input-lastName').type(users[idx].lastname)
        cy.get('#testId-Input-document').type(users[idx].rut)
        cy.get('#testId-Input-phoneNumber').type(users[idx].phone)

        const email = `${users[idx].name.toLowerCase()}.${users[
            idx
        ].lastname.toLowerCase()}${seed}@gmail.com`
        const pass = 'Qweuieu389383$'

        cy.get('#testId-Input-email').type(email)
        cy.get('#testId-Input-password').type(pass)

        cy.writeFile('cypress/fixtures/credentials.json', {
            name: users[idx].name,
            email: email,
            password: pass,
        })
    })

    cy.get('.jsx-3197916804.checkbox').its(0).dblclick(12, 12)
    cy.get('.jsx-3197916804.checkbox').its(1).dblclick(10, 12, { force: true })

    cy.get('#testId-Button-submit').click()

    cy.scrollTo('top')
    cy.get('h3.jsx-2296663505').should(
        'have.text',
        'Lo sentimos, estamos presentando problemas técnicos. Por favor usa la navegación por categorías. '
    )
})

Cypress.Commands.add('loginInUser', () => {
    cy.readFile('cypress/fixtures/credentials.json').then((json) => {
        let credentials = json

        cy.get('#testId-cc-login-form-email-input').type(credentials.email)
        cy.get('#testId-cc-login-form-password-input').type(
            credentials.password
        )

        cy.get('#testId-cc-login-form-submit').click()

        cy.get('.UserInfo-module_display1__1TD_E').should(
            'have.text',
            `Hola, ${credentials.name}`
        )
    })
})
