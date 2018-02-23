const React = require("react")

class History extends React.Component {
    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        this.props.requests.getHistory(this)
    }

    noRounds() {
        this.setState({roundsDisplay: <NoRounds/>})
    }

    rounds(rs) {
        this.setState({roundsDisplay: <Rounds rounds={rs}/>})
    }

    render() {
        return <div>
            {this.state.roundsDisplay}
        </div>
    }
}

class NoRounds extends React.Component {
    render() {
        return <h1>NO ROUNDS</h1>
    }
}

class Rounds extends React.Component {
    render() {
        return <table>
            <thead>
                <tr>
                    <td>P1 Throw</td>
                    <td>P2 Throw</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
            {this.props.rounds.map((r, i) => <tr key={i}>
                <td>{r.p1Throw}</td>
                <td>{r.p2Throw}</td>
                <td>{r.result}</td>
            </tr>)}
            </tbody>
        </table>
    }
}

module.exports = History