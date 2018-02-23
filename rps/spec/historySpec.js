const {Requests, Round} = require("../src/rps")

describe("history", function () {
    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let historyObserverSpy = jasmine.createSpyObj("historyObserverSpy", ["noRounds"])

            new Requests().getHistory(historyObserverSpy)

            expect(historyObserverSpy.noRounds).toHaveBeenCalled()
        })
    })

    fdescribe("people have played", function () {
        it("send the rounds to the observer", function () {
            let historyObserverSpy = jasmine.createSpyObj("historyObserverSpy", ["rounds"])
            let repo = {
                isEmpty(){},
                getRounds(){},
                save(){}
            }

            new Requests().playRound("rock", "sailboat", {invalid(){}}, repo)
            new Requests().getHistory(historyObserverSpy, repo)

            expect(historyObserverSpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })
})