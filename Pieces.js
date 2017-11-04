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

function isVacant(Position) {//checks if the given position has a piece on it returns true if there is a piece

}

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
    possiblemoves(){
        var dict = {};

        if(this.team === "White"){
            var oneMoveForward = this.position.yGet + 1;
            //first move
            if(this.position.yGet = 2){
                if(isVacant(new Position(this.position.xGet, oneMoveForward))) {
                    dict.add(new Position(this.position.xGet, oneMoveForward));
                    if(isVacant(new Position(this.position.xGet, oneMoveForward + 1))){
                        dict.add(dict.add(new Position(this.position.xGet, oneMoveForward + 1));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.xGet, oneMoveForward))){
                dict.add(new Position(this.position.xGet, oneMoveForward))
            }
            //Attack move
            if(!isVacant(new Position(this.position.xGet, oneMoveForward)){

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