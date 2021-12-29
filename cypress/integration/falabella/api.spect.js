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

    it('Checking parameters on cat fact', () => {
        const currentPage = 1 // getting an especific page
        const limit = 10 // results per page

        cy.request(`${domain}/facts?limit=${limit}&page=${currentPage}`).then(
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

                // for debugging purposes in testing
                cy.logDebug(response.body)

                expect(response.body)
                    .to.have.property('current_page')
                    .to.be.a('number')
                    .and.be.equal(currentPage)
                expect(response.body)
                    .to.have.property('data')
                    .to.be.a('array')
                    .and.be.length(limit)
                expect(response.body)
                    .to.have.property('from')
                    .to.be.a('number')
                    .and.be.equal(currentPage == 1 ? currentPage : limit + 1)
                expect(response.body)
                    .to.have.property('to')
                    .to.be.a('number')
                    .and.be.equal(limit)
                expect(response.body)
                    .to.have.property('per_page')
                    .to.be.a('number')
                    .and.be.equal(limit)
            }
        )
    })
})
