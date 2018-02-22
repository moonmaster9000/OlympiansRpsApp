function Rps(){
    this.play = function(p1, p2, observer){
        new PlayRequest(p1, p2, observer).process()
    }
}

function PlayRequest(p1, p2, observer){
    this.process = function(){
        if (inputInvalid())
            observer.invalid()
        else if (draw())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    const validShapes = ["rock", "paper", "scissors"]

    function inputInvalid() {
        return !validShapes.includes(p1) || !validShapes.includes(p2)
    }

    function draw() {
        return p1 === p2
    }

    function p1Wins() {
        return (
            p1 === "rock"     && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper"    ||
            p1 === "paper"    && p2 === "rock"
        )
    }


}
describe("play", function () {
    let observerSpy, rps

    beforeEach(function () {
        rps = new Rps()
    })

    describe("p1 win scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["p1Wins"])
        })

        it("rock v. scissors", function () {
            rps.play("rock", "scissors", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.play("scissors", "paper", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.play("paper", "rock", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })


    })

    describe("p2 win scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            rps.play("scissors", "rock", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.play("paper", "scissors", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.play("rock", "paper", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })
    })


    describe("tie scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["tie"])
        })

        it("rock v. rock", function () {
            rps.play("rock", "rock", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.play("paper", "paper", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.play("scissors", "scissors", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["invalid"])
        })

        it("rock v. <invalid>", function () {
            rps.play("rock", Math.random(), observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

        it("<invalid> v. rock", function () {
            rps.play(Math.random(), "rock", observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

        it("invalid versus the same invalid", function () {
            rps.play("sailboat", "sailboat", observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

    })
})