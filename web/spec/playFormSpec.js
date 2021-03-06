const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")


describe("play form", function () {
    describe("the request processes as invalid", function () {
        beforeEach(function () {
            let invalidRequestStub = {
                playRound(p1, p2, observer){
                    observer.invalid()
                }
            }

            renderForm(invalidRequestStub)
        })

        it("display 'INVALID' to the user", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })
    })

    describe("the request processes as tie", function () {
        beforeEach(function () {
            let tieRequestStub = {
                playRound(p1, p2, observer){
                    observer.tie()
                }
            }

            renderForm(tieRequestStub)
        })

        it("display 'TIE' to the user", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })
    
    describe("the request processes as p1Wins", function () {
        beforeEach(function () {
            let p1WinsRequestStub = {
                playRound(p1, p2, observer){
                    observer.p1Wins()
                }
            }

            renderForm(p1WinsRequestStub)
        })

        it("display 'P1 Won!' to the user", function () {
            expect(page()).not.toContain("P1 Won!")
            submitForm()
            expect(page()).toContain("P1 Won!")
        })
    })

    describe("the request processes as p2Wins", function () {
        beforeEach(function () {
            let p2WinsRequestStub = {
                playRound(p1, p2, observer){
                    observer.p2Wins()
                }
            }

            renderForm(p2WinsRequestStub)
        })

        it("display 'P2 Won!' to the user", function () {
            expect(page()).not.toContain("P2 Won!")
            submitForm()
            expect(page()).toContain("P2 Won!")
        })
    })

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

    it("sends the user's input to the play request", function () {
        let playRequestSpy = jasmine.createSpy("playRequestSpy")

        renderForm({playRound: playRequestSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playRequestSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })


    function renderForm(requests) {
        renderComponent(<PlayForm requests={requests}/>)
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})
