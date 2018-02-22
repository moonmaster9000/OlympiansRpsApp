const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    submitForm(){
        this.setState({outcome: "INVALID"})
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

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "hello!!!"
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
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
