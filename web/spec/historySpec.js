const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const History = require("../src/components/History")
const {Round} = require("rps")

describe("history component", function () {
    describe("the request processes as noRounds", function () {
        beforeEach(function () {
            let noRoundsStub = {
                getHistory(observer){
                    observer.noRounds()
                }
            }

            renderComponent(noRoundsStub)
        })

        it("display 'NO ROUNDS' to the user", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("the request returns rounds", function () {
        beforeEach(function () {
            let noRoundsStub = {
                getHistory(observer){
                    observer.rounds([new Round("foo", "bar", "baz")])
                }
            }

            renderComponent(noRoundsStub)
        })

        it("display 'NO ROUNDS' to the user", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderComponent(requests) {
        ReactDOM.render(
            <History requests={requests}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }
})
