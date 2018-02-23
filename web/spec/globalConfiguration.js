const React = require("react")
const ReactDOM = require("react-dom")

var domFixture

function setupDom() {
    domFixture = document.createElement("div")
    document.body.appendChild(domFixture)
}

beforeEach(function () {
    setupDom()
})

afterEach(function () {
    domFixture.remove()
})

function page() {
    return domFixture.innerText
}

function renderComponent(component) {
    ReactDOM.render(
        component,
        domFixture
    )
}

window.page = page
window.renderComponent = renderComponent
window.domFixture = domFixture