function Requests(roundRepo) {
    this.playRound = function (p1Throw, p2Throw, observer) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo).process()
    }

    this.getHistory = function (observer) {
        if (roundRepo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(roundRepo.getRounds())
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo) {
    this.process = function () {
        if (throwInvalid())
            processRoundAs("invalid")
        else if (tie())
            processRoundAs("tie")
        else if (p1Wins())
            processRoundAs("p1Wins")
        else
            processRoundAs("p2Wins")
    }

    function processRoundAs(outcome){
        roundRepo.save(new Round(p1Throw, p2Throw, outcome))
        observer[outcome]()
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
            p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper" ||
            p1Throw === "paper" && p2Throw === "rock"
        )
    }
}

function Round(p1Throw, p2Throw, result) {
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

module.exports = {
    Requests, Round
}