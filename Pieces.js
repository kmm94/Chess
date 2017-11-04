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

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }

        /*
        checkUpgrade() {
            if (this.team === "White" && this.position.getYPosition == 8) {
            //    upgrade();
            } else (this.team === "Black" && this.position.getYPosition == 1) {
          //      upgrade();
            }
        }

        upgrade() {
            new Queen(this.position.getPosition, this.team.getTeam);
        } */
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
