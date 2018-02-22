const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    render(){
        return <h1>Hello World!</h1>
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

            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })
    })

})
