class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
    get getPosition() {
        return this.xpos+this.ypos;
    }
    get xPos(){
        return this.xpos;
    }

}

class Team {
    constructor(team) {
        this.team = team;
    }
}

function isVacant(Position) {

}

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
    possiblemoves(){
        var dict = {};

        if(this.team === "White"){
            if(this.position)

        }

    }

}

var a = new Pawn(new Position("a","2"), new Team("White"));