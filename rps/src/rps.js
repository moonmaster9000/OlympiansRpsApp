function Requests() {
    this.playRound = function (p1Throw, p2Throw, observer, repo) {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function (observer, repo) {
        if (repo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(repo.getRounds())
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo) {
    this.process = function () {
        if (throwInvalid()) {
            repo.save(new Round(p1Throw, p2Throw, "invalid"))
            observer.invalid()
        } else if (tie())
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