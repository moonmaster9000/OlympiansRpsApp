const {Requests, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let requests

    beforeEach(function () {
        requests = new Requests(new FakeRoundRepo())
    })

    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let historyObserverSpy = jasmine.createSpyObj("historyObserverSpy", ["noRounds"])

            requests.getHistory(historyObserverSpy)

            expect(historyObserverSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe("people have played", function () {
        it("send the rounds to the observer", function () {
            let historyObserverSpy = jasmine.createSpyObj("historyObserverSpy", ["rounds"])

            requests.playRound("rock", "sailboat", {invalid(){}})
            requests.playRound("rock", "rock", {tie(){}})
            requests.playRound("rock", "scissors", {p1Wins(){}})
            requests.playRound("rock", "paper", {p2Wins(){}})

            requests.getHistory(historyObserverSpy)

            expect(historyObserverSpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat",   "invalid"),
                new Round("rock", "rock",       "tie"),
                new Round("rock", "scissors",   "p1Wins"),
                new Round("rock", "paper",      "p2Wins"),
            ])
        })

    })
})