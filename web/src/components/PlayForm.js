const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    submitForm(){
        this.props.requests.playRound(this.state.p1Throw, this.state.p2Throw, this)
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

    inputChangeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.outcome}
            <input name="p1Throw" onChange={this.inputChangeHandler.bind(this)}/>
            <input name="p2Throw" onChange={this.inputChangeHandler.bind(this)}/>
            <button onClick={this.submitForm.bind(this)}>PLAY</button>
        </div>
    }
}


module.exports = PlayForm