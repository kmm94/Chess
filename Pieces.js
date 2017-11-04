class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
    get pos() {
        return (this.xpos+this.ypos).toString();
    }
    get yGet() {
        return this.xpos;
    }
    get xGet() {
        return this.xpos;
    }

}

class Team {
    constructor(team) {
        this.team = team;
    }
  
    get getTeam() {
        return this.team;
    }
}

function isVacant(Position) {//checks if the given position has a piece on it

}

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;

    }
    possiblemoves(){
        var dict = {};

        if(this.team === "White"){
            var oneMoveForward = new Position(this.position.xGet, this.position.yGet+1);
            if(this.position.yGet = 2){
                if(isVacant(oneMoveForward)) {
                    dict.add(oneMoveForward);
                    if(isVacant(oneMoveForward.ypos+1)){
                        dict.add(dict.add(oneMoveForward.yGet);
                    }
                }

            }
            if( isVacant(this.position.yGet() +1)){
                dict.add(new Position(this.position.xGet, ))
            }

        }

    }

        checkUpgrade() {
            if (this.team === "White" && this.position.yGet == 8) {
                upgrade();
            } else if (this.team === "Black" && this.position.yGet == 1) {
                upgrade();
            }
        }

        upgrade() {
            new Queen(this.position.getPosition, this.team.getTeam);
        }
}

var a = new Pawn(new Position("A", 2), new Team("White"));


class Tower {
    onstructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Knight {
    onstructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Bishop {
    onstructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Queen {
    onstructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class King {
    onstructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}
