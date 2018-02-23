const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    submitForm(){
        this.props.requests.play("p1 throw placeholder", "p2 throw placeholder", this)
    }
    
    tie(){
        this.setState({outcome: "TIE"})
    }

    invalid(){
        this.setState({outcome: "INVALID"})
    }

    p1Wins(){
        this.setState({outcome: "P1 Won!"})
    }

    p2Wins(){
        this.setState({outcome: "P2 Won!"})
    }

    render(){
        return <div>
            {this.state.outcome}
            <button onClick={this.submitForm.bind(this)}>PLAY</button>
        </div>
    }
}

describe("play form", function () {
    describe("the request processes as invalid", function () {
        beforeEach(function () {
            let invalidRequestStub = {
                play(p1, p2, observer){
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
                play(p1, p2, observer){
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
                play(p1, p2, observer){
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
                play(p1, p2, observer){
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

    function renderForm(requests) {
        ReactDOM.render(
            <PlayForm requests={requests}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})
