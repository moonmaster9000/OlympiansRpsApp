function Requests(){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.process = function(){
        if (throwInvalid())
            observer.invalid()
        else if (tie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    const validThrows = ["rock", "paper", "scissors"]

    function throwInvalid() {
        return !validThrows.includes(p1Throw) || !validThrows.includes(p2Throw)
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return (
            p1Throw === "rock"     && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper"    ||
            p1Throw === "paper"    && p2Throw === "rock"
        )
    }
}

module.exports = {
    Requests
}