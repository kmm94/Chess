class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    getPos() {
        return this.xpos+this.ypos;
    }

    getY() {
        return this.ypos;
    }
    getX() {
        return this.xpos;
    }

    setY(yPos) {
        this.ypos = yPos;
    }

    set geru(pitjh) {
        this.ypos = pitjh;
    }

}

class Team {
    constructor(team) {
        this.team = team;
    }

    getTeam() {
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
    upgrade() {
        return new Queen(this.position, new Team(this.team.teamGet));
    }

    checkUpgrade() {
        if (this.team === "White" && this.position.getY == 8) {
            upgrade();
        } else if (this.team === "Black" && this.position.getY == 1) {
            upgrade();
        }
    }

        upgrade() {
            new Queen(this.position.getPosition, this.team.getTeam);
        }
}

}

class Tower {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Knight {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Bishop {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Queen {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class King {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}
var a = new Pawn(new Position("A", 2), new Team("White"));
var b = a.upgrade();
console.log(a.position.getPos() + a.team.getTeam());
a.position.setY(3);
console.log(a.position.getPos() + a.team.getTeam());

/*
console.log(b.position.pos + b.team.teamGet);
delete a;
console.log(b.position.pos + b.team.teamGet);
*/