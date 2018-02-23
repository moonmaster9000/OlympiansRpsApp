const {Requests, Round} = require("../src/rps")

describe("history", function () {
    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let historyObserverSpy = jasmine.createSpyObj("historyObserverSpy", ["noRounds"])

            new Requests().getHistory(historyObserverSpy)

            expect(historyObserverSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe("people have played", function () {
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

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.getRounds = function(){
        return rounds
    }
}

fdescribe("repo contract", function () {
    describe("when no rounds have been saved", function () {
        it("is empty", function () {
            expect(new FakeRoundRepo().isEmpty()).toBe(true)
        })
    })

    describe("when rounds have been saved", function () {
        it("is not empty", function () {
            const repo = new FakeRoundRepo()

            repo.save(new Round())

            expect(repo.isEmpty()).toBe(false)
        })

        it("returns the rounds that have been saved", function () {
            const repo = new FakeRoundRepo()
            const round1 = new Round(Math.random())
            const round2 = new Round()

            repo.save(round1)
            repo.save(round2)

            expect(repo.getRounds()).toEqual([round1, round2])
        })
    })
})