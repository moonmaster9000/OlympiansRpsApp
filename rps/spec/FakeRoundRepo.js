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

module.exports = FakeRoundRepo