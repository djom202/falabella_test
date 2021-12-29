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

    it('Get a list of cat facts', () => {
        const max_length = 50
        const limit = 10
        const pages = 4
        const currentPage = 1
        const totalResutls = 33
        let count = 1

        cy.request(
            `${domain}/facts?max_length=${max_length}&limit=${limit}`
        ).then((response) => {
            expect(response).property('status').to.equal(200)
            expect(response.headers)
                .property('content-type')
                .to.equal('application/json')
            expect(response.body).to.be.an('object')

            expect(parseInt(response.headers['x-ratelimit-limit'])).to.equal(
                xRatelimitLimit
            )
            expect(
                parseInt(response.headers['x-ratelimit-remaining'])
            ).to.be.within(1, xRatelimitLimit)

            expect(response.body)
                .to.have.property('current_page')
                .to.be.a('number')
                .and.be.equal(currentPage)
            expect(response.body)
                .to.have.property('data')
                .to.be.a('array')
                .and.be.length(limit)
            expect(response.body)
                .to.have.property('first_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts?page=${currentPage}`)
            expect(response.body)
                .to.have.property('from')
                .to.be.a('number')
                .and.be.equal(currentPage)
            expect(response.body)
                .to.have.property('last_page')
                .to.be.a('number')
                .and.be.equal(pages)
            expect(response.body)
                .to.have.property('last_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts?page=${pages}`)
            expect(response.body)
                .to.have.property('next_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts?page=${currentPage + 1}`)
            expect(response.body)
                .to.have.property('path')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts`)
            expect(response.body)
                .to.have.property('per_page')
                .to.be.a('string')
                .and.be.equal(limit.toString())
            expect(response.body)
                .to.have.property('prev_page_url')
                .to.be.equal(null)
            expect(response.body)
                .to.have.property('to')
                .to.be.a('number')
                .and.be.equal(limit)
            expect(response.body)
                .to.have.property('total')
                .to.be.a('number')
                .and.be.equal(totalResutls) // to check

            expect(response.body)
                .to.have.property('links')
                .to.be.a('array')
                .and.be.length(pages + 2)

            response.body.links.forEach((item) => {
                if (item.url === null) {
                    expect(item).to.contain({
                        url: null,
                        label: 'Previous',
                        active: false,
                    })
                } else {
                    expect(item).to.contain({
                        url: `${domain}/facts?page=${count <= 4 ? count : 2}`,
                        label: count <= 4 ? count.toString() : 'Next',
                        active: count == 1 ? true : false,
                    })

                    count++
                }
            })
        })
    })

    it('Get a empty list of cat facts', () => {
        let max_length = 10
        let limit = 10
        let pages = 1
        let currentPage = 1

        cy.request(
            `${domain}/facts?max_length=${max_length}&limit=${limit}`
        ).then((response) => {
            expect(response).property('status').to.equal(200)
            expect(response.headers)
                .property('content-type')
                .to.equal('application/json')
            expect(response.body).to.be.an('object')

            expect(parseInt(response.headers['x-ratelimit-limit'])).to.equal(
                xRatelimitLimit
            )
            expect(
                parseInt(response.headers['x-ratelimit-remaining'])
            ).to.be.within(1, xRatelimitLimit)

            expect(response.body)
                .to.have.property('current_page')
                .to.be.a('number')
                .and.be.equal(currentPage)
            expect(response.body)
                .to.have.property('data')
                .to.be.a('array')
                .and.be.length(0)
            expect(response.body)
                .to.have.property('first_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts?page=${currentPage}`)
            expect(response.body).to.have.property('from').to.be.null
            expect(response.body)
                .to.have.property('last_page')
                .to.be.a('number')
                .and.be.equal(pages)
            expect(response.body)
                .to.have.property('last_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts?page=${pages}`)
            expect(response.body).to.have.property('next_page_url').to.be.null
            expect(response.body)
                .to.have.property('path')
                .to.be.a('string')
                .and.be.equal(`${domain}/facts`)
            expect(response.body)
                .to.have.property('prev_page_url')
                .to.be.equal(null)
            expect(response.body).to.have.property('to').to.be.null
            expect(response.body)
                .to.have.property('total')
                .to.be.a('number')
                .and.be.equal(0)

            expect(response.body)
                .to.have.property('links')
                .to.be.a('array')
                .and.be.length(pages + 2)

            expect(response.body.links[0]).to.contain({
                url: null,
                label: 'Previous',
                active: false,
            })
            expect(response.body.links[1]).to.contain({
                url: `${domain}/facts?page=${currentPage}`,
                label: currentPage.toString(),
                active: true,
            })
            expect(response.body.links[2]).to.contain({
                url: null,
                label: 'Next',
                active: false,
            })

            // for debugging purposes in testing
            cy.logDebug(response.body)

            expect(response.body)
                .to.have.property('per_page')
                .to.be.a('number')
                .and.be.equal(limit)
        })
    })

    it('Get a list of breeds', () => {
        const limit = 50
        const pages = 4
        const currentPage = 1
        let count = 1

        cy.request(`${domain}/breeds?limit=${limit}`).then((response) => {
            expect(response).property('status').to.equal(200)
            expect(response.headers)
                .property('content-type')
                .to.equal('application/json')
            expect(response.body).to.be.an('object')

            expect(parseInt(response.headers['x-ratelimit-limit'])).to.equal(
                xRatelimitLimit
            )
            expect(
                parseInt(response.headers['x-ratelimit-remaining'])
            ).to.be.within(1, xRatelimitLimit)

            expect(response.body)
                .to.have.property('current_page')
                .to.be.a('number')
                .and.be.equal(currentPage)

            expect(response.body)
                .to.have.property('first_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/breeds?page=${currentPage}`)
            expect(response.body)
                .to.have.property('from')
                .to.be.a('number')
                .and.be.equal(currentPage)
            expect(response.body)
                .to.have.property('last_page')
                .to.be.a('number')
                .and.be.equal(pages)
            expect(response.body)
                .to.have.property('last_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/breeds?page=${pages}`)
            expect(response.body)
                .to.have.property('next_page_url')
                .to.be.a('string')
                .and.be.equal(`${domain}/breeds?page=${currentPage + 1}`)
            expect(response.body)
                .to.have.property('path')
                .to.be.a('string')
                .and.be.equal(`${domain}/breeds`)

            expect(response.body)
                .to.have.property('prev_page_url')
                .to.be.equal(null)
            expect(response.body)
                .to.have.property('total')
                .to.be.a('number')
                .and.be.equal(98) // to check

            expect(response.body)
                .to.have.property('links')
                .to.be.a('array')
                .and.be.length(pages + 2)

            response.body.links.forEach((item) => {
                if (item.url === null) {
                    expect(item).to.contain({
                        url: null,
                        label: 'Previous',
                        active: false,
                    })
                } else {
                    expect(item).to.contain({
                        url: `${domain}/breeds?page=${count <= 4 ? count : 2}`,
                        label: count <= 4 ? count.toString() : 'Next',
                        active: count == 1 ? true : false,
                    })

                    count++
                }
            })

            // for debugging purposes in testing
            cy.logDebug(response.body)

            expect(response.body)
                .to.have.property('data')
                .to.be.a('array')
                .and.be.length(limit)
            expect(response.body)
                .to.have.property('per_page')
                .to.be.a('number')
                .and.be.equal(limit)
            expect(response.body)
                .to.have.property('to')
                .to.be.a('number')
                .and.be.equal(limit)
        })
    })

    it('Checking parameters on breeds', () => {
        const currentPage = 1 // getting an especific page
        const limit = 10 // results per page

        cy.request(`${domain}/breeds?limit=${limit}&page=${currentPage}`).then(
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
                    .to.have.property('per_page')
                    .to.be.a('number')
                    .and.be.equal(limit)
                expect(response.body)
                    .to.have.property('from')
                    .to.be.a('number')
                    .and.be.equal(currentPage == 1 ? currentPage : limit + 1)
                expect(response.body)
                    .to.have.property('to')
                    .to.be.a('number')
                    .and.be.equal(limit)
            }
        )
    })
})
