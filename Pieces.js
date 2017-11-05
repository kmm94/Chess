var map = {};


function populateMap() {
    var xPos = "A";
    var notDone = true;
    var toTheRight = true;

    while(notDone) {
        for (i = 1; i <= 8; i++) {
            map[xPos+i] = new Space(new Position(xPos, i));
        }
        xPos = moveXpos(xPos, toTheRight);
        if(xPos == null) {
            notDone = false;
            break;
        }
    }
}


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

/**
 * Returns true if the move was succesful. Returns false if the move wasn't made.
 */
function movePiece(Piece, Position) {
    var Space = map[Position.getPos()];
    return Space.setPiece(Piece);
}

function addToMap(Piece, Position) {
    var Space = map[Position.getPos()];
    return Space.setPiece(Piece);
}

function isVacant(Position) {//checks if the given position has a piece on it returns false if there is a piece
    Space = map[Position.getPos()];
    if (Space.getPiece() == null) {
        return null;
    } else {
        return Space.getPiece();
    }
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
        addToMap(this, Position);
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
            if(!isVacant(new Position(this.position.xGet, oneMoveForward))){

            }
        }
    }

    setPos(Position) {
        this.position = Position;
    }

    upgrade() {
        return new Queen(new Position(this.position.getX(), this.position.getY()), new Team(this.team));
    }

    checkUpgrade() {
        if (this.team === "White" && this.position.getY == 8) {
            this.upgrade();
        } else if (this.team === "Black" && this.position.getY == 1) {
            this.upgrade();
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

function crossmoves(dict,piece, direction, toTheRight) {
    var xPos = piece.position.getX();
    var yPos = piece.position.getX();
    while (true) {
        xPos = moveXpos(xPos, toTheRight);
        if (xPos != null) {
            break;
        }
        yPos = yPos + direction;
        if (yPos > 8 || yPos < 1) {
            break;
        }
        var pos = new Position(xPos, yPos);
        if (isVacant(pos) == null) {
            dict.add(pos);
        } else if (isVacant(pos).team != piece.team) {
            dict.add(pos);
            break;
        }
    }
    return dict;
}

class Bishop {
    constructor(Position, Team){
        this.team = Team;
        addToMap(this, Position);
        this.position = Position;
    }

    setPos(Position) {
        this.position = Position;
    }

    possiblemoves(){
        var dict = {};
        var xPos = this.position.getX();
        var yPos = this.position.getX();
        //right up
        crossmoves(dict, this, 1, true);
        //left up
        crossmoves(dict, this, 1, false);
        //right down
        crossmoves(dict, this, -1, true);
        //left down
        crossmoves(dict, this, -1, false);
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

class Space {
    constructor(Position) {
        this.position = Position;
        this.piece = null;
    }

    getPosition() {
        return this.position;
    }

    getPiece() {
        return this.piece;
    }

    setPiece(piece) {
        if (this.piece != null) {
            var a = this.piece;
            if (this.getPiece().team != piece.team) {
                //this.piece.kill();
                this.piece = piece;
                piece.setPos(this.position);
                return true;
            } else {
                return false;
            }
        }
        this.piece = piece;
        piece.setPos(this.position);
        return true;
    }
}

populateMap();
var bishPos = new Position("C", 1);
var bish = new Bishop(bishPos, "White");
console.log(isVacant(bishPos));
var enemyPos = new Position("A", 3);
var enemyPawn = new Pawn(enemyPos, "White");
console.log(isVacant(enemyPos));
console.log("Moving Bishop");
movePiece(bish, enemyPos);
console.log(bish);
