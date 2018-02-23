const {Round} = require("../src/rps")

function roundRepoContract(roundRepoClass){
    describe("repo contract", function () {
        let repo

        beforeEach(function () {
            repo = new roundRepoClass()
        })
        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                repo.save(new Round())

                expect(repo.isEmpty()).toBe(false)
            })

            it("returns the rounds that have been saved", function () {
                const round1 = new Round(Math.random())
                const round2 = new Round()

                repo.save(round1)
                repo.save(round2)

                expect(repo.getRounds()).toEqual([round1, round2])
            })
        })
    })
}

module.exports = roundRepoContract