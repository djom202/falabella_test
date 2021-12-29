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
