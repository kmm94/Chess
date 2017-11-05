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

    isEquals(Position) {
        if(this.xpos === Position.xpos && this.ypos == Position.ypos) {
            return true;
        } else {
            return false;
        }
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
 * should TODO send the move to server!
 */
function movePiece(Piece, Position) {
    var moves = Piece.possiblemoves();
    for (i = 0; i <= moves.length; i++) {
        var pos = moves[i];
        if (pos.isEquals(Position)) {
            var Space = map[Position.getPos()];
            return Space.setPiece(Piece);
        }
    }
    return null;
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
        var dictPossibleMoves = [];

        if(this.team === "White"){
            // White pawn
            var ypos= this.position.getY();
            var oneMoveForward = ypos + 1;
            //first move
            if(this.position.getY() == 2){
                if(isVacant(new Position(this.position.getX(), oneMoveForward))===null) {
                    dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward));
                    if(isVacant(new Position(this.position.getX(), oneMoveForward + 1))=== null){
                        dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward + 1));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.getX(), oneMoveForward))===null) {
                dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward))
            }
            //Attack move
            let toRight = moveXpos(this.position.getX(), true);
            let toLeft =  moveXpos(this.position.getX(), false);
            if(toRight !== null) {
                if(isVacant(new Position(toRight, oneMoveForward))!== null && isVacant(new Position(toRight, oneMoveForward)).team === "Black"){
                    dictPossibleMoves.push(new Position(toRight, oneMoveForward));
                }
            }
            if(toLeft !== null) {
                if(isVacant(new Position(toRight, oneMoveForward))!== null && isVacant(new Position(toRight, oneMoveForward)).team === "Black"){
                    dictPossibleMoves.push(new Position(toLeft, oneMoveForward));
                }
            }
            return dictPossibleMoves
        } else {
            // Black pawn
            let oneMoveForward = this.position.getY() - 1;
            //first move
            if(this.position.getY() == 2){
                if(isVacant(new Position(this.position.getX(), oneMoveForward))===null) {
                    dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward));
                    if(isVacant(new Position(this.position.getX(), oneMoveForward + 1))===null){
                        dictPossibleMoves.push(dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward + 1)));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.getX(), oneMoveForward))===null) {
                dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward))
            }
            //Attack move
            let toRight = moveXpos(this.position.getX(), true);
            let toLeft =  moveXpos(this.position.getX(), false);
            if(toRight !== null) {
                if(isVacant(new Position(toRight, oneMoveForward))!== null && isVacant(new Position(toRight, oneMoveForward)).team === "White"){
                    dictPossibleMoves.push(new Position(toRight, oneMoveForward));
                }
            }
            if(toLeft !== null) {
                if(isVacant(new Position(toRight, oneMoveForward))!== null && isVacant(new Position(toRight, oneMoveForward)).team === "White"){
                    dictPossibleMoves.push(new Position(toLeft, oneMoveForward));
                }
            }
        }
        return dictPossibleMoves;
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

function movesLeftRight(dict, piece, toTheRight){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while(True){
        xPos = moveXpos(xPos, toTheRight);
        if (xPos != null){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.push(newPos);
        } else if (isVacant(newPos).getTeam()!== piece.getTeam()){
            dict.push(newPos);
            break;
        }
    }
}

function movesUpDown(dict, piece, direction){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while (True){
        yPos = yPos + direction;
        if (yPos > 8 || yPos < 1){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.push(newPos);
        } else if (isVacant(newPos).getTeam()!== piece.getTeam()){
            dict.push(newPos);
            break;
        }
    }
}

class Rook {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    possiblemoves(){
        var dict = {};
        var xPos = this.position.getX();
        var yPos = this.position.getY();
        // Right
        movesLeftRight(dict, this, true);
         // Left
        movesLeftRight(dict,this, false);
        // Up
        movesUpDown(dict, this, 1);
        // Down
        movesUpDown(dict, this, -1);
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
    var yPos = piece.position.getY();
    while (true) {
        xPos = moveXpos(xPos, toTheRight);
        if (xPos == null) {
            break;
        }
        yPos = yPos + direction;
        if (yPos > 8 || yPos < 1) {
            break;
        }
        var pos = new Position(xPos, yPos);
        if (isVacant(pos) == null) {
            dict.push(pos);
        } else if (isVacant(pos).team != piece.team) {
            dict.push(pos);
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
        var dict = [];
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
        console.log(dict.length);
        return dict;
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
    possiblemoves() {
        var dict = {};

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
// console.log(isVacant(bishPos));
var enemyPos = new Position("B", 2);
var enemyPawn = new Pawn(enemyPos, "Black");
var friendlyPawnPos = new Position("A",1);
var friendlyPawn = new Pawn(friendlyPawnPos, "White");
// console.log(friendlyPawn.possiblemoves());
// console.log(isVacant(enemyPos));
// console.log("Moving Bishop");
movePiece(bish, enemyPos);
// console.log(bish);
console.log(friendlyPawn.possiblemoves());
movePiece(friendlyPawn,friendlyPawn.possiblemoves()[0]);
// console.log(isVacant(new Position("A",2)));
console.log(friendlyPawn.possiblemoves());
movePiece(friendlyPawn,friendlyPawn.possiblemoves()[1]);
console.log(isVacant(new Position("A", 4)));
console.log(friendlyPawn.possiblemoves())
