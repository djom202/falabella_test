const domain = 'https://catfact.ninja'
const xRatelimitLimit = 100

describe('Cat Fact API', () => {
    it('Get a cat fact', () => {
        let max_length = 100

        cy.request(`${domain}/fact?max_length=${max_length}`).then(
            (response) => {
                expect(response).property('status').to.equal(200)
                expect(response.headers)
                    .property('content-type')
                    .to.equal('application/json')
                expect(response.body).to.be.an('object')

                expect(
                    parseInt(response.headers['x-ratelimit-limit'])
                ).to.equal(xRatelimitLimit)
                expect(
                    parseInt(response.headers['x-ratelimit-remaining'])
                ).to.be.within(1, xRatelimitLimit)

                expect(response.body).to.have.property('fact').to.be.a('string')
                expect(response.body)
                    .to.have.property('length')
                    .to.be.a('number')
                    .and.be.within(0, max_length)
            }
        )
    })
})
