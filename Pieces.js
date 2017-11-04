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

    setY(ypos) {
        this.ypos = ypos;
    }

    setX(xpos) {
        this.xpos = xpos;
    }

    setPos(Position) {
        this.xpos = Position.getX();
        this.ypos = Position.getY();
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
        return new Queen(new Position(this.position.getX(), this.position.getY()), new Team(this.team.getTeam()));
    }

    checkUpgrade() {
        if (this.team === "White" && this.position.getY == 8) {
            this.upgrade();
        } else if (this.team === "Black" && this.position.getY == 1) {
            this.upgrade();
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