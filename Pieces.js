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

function isVacant(Position) {//checks if the given position has a piece on it returns true if there isn't a piece
    return true;
}
function moveXpos(xPos, toTheRight) {
    var x = xPos.toUpperCase();
    if(toTheRight){
        switch (x){
            case "A":
                return "B";
            case "B":
                return "C";
            case "C":
                return "D";
            case "D":
                return "E";
            case "E":
                return "F";
            case "F":
                return "G";
            case "G":
                return "H";
            case "H":
                return null;
        }
    } else {
        switch (x){
            case "A":
                return null;
            case "B":
                return "A";
            case "C":
                return "B";
            case "D":
                return "C";
            case "E":
                return "D";
            case "F":
                return "E";
            case "G":
                return "F";
            case "H":
                return "G";
        }
    }

    return true;
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
                        dict.add(dict.add(new Position(this.position.xGet, oneMoveForward + 1)));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.xGet, oneMoveForward))) {
                dict.add(new Position(this.position.xGet, oneMoveForward))
            }
            //Attack move
            var toRight = moveXpos(this.position.xGet, true);
            var toLeft =  moveXpos(this.position.xGet, false);

            if(toRight !== null) {
                if(!isVacant(new Position(toRight, oneMoveForward))){
                    dict.add(new Position(toRight, oneMoveForward));
                }
            }
            if(toLeft !== null) {
                if(!isVacant(new Position(toLeft, oneMoveForward))){
                    dict.add(new Position(toLeft, oneMoveForward));
                }
            }
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