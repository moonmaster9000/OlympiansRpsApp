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
        it("display 'INVALID' to the user", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello!!!"
            document.body.appendChild(domFixture)

            let requests = {
                play(p1, p2, observer){
                    observer.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm requests={requests}/>,
                domFixture
            )

            expect(domFixture.innerText).not.toContain("INVALID")
            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })
    })

})
