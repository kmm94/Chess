var map = {};
var livingPieces = [];
var whitesTurn = true;

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

function initialiseBoard() {
    populateMap();
    addWhitePieces();
    addBlackPieces();
}

function movePieceByCoord(from, to) {
    var piece = map[from.getPos()].getPiece();
    if (piece === undefined) {
        return false;
    }
    if (piece.team == "White" && !whitesTurn) {
        return false;
    } else if (piece.team == "Black" && whitesTurn) {
        return false;
    } else {
        return movePiece(piece, to);
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
    return false;
}

function addToMap(Piece, Position) {
    livingPieces.push(Piece);
    var Space = map[Position.getPos()];
    return Space.setPiece(Piece);
}

function isVacant(Position) {//checks if the given position has a piece on it returns false if there is a piece
    space = map[Position.getPos()];
    console.log(space);

    if (space.getPiece() === undefined) {
        return null;
    } else {
        return space.getPiece();
    }
    return true;
}

class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    getPos() {
        return this.xpos + this.ypos;
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

class Space {
    constructor(Position) {
        this.position = Position;
        this.piece = undefined;
        this.threatnedByBlack = false;
        this.threatnedByWhite = false;
    }

    getPosition() {
        return this.position;
    }

    getPiece() {
        return this.piece;
    }

    getBlackThreat(){
        return this.threatnedByBlack;
    }

    getWhiteThreat(){
        return this.threatnedByWhite;
    }

    setBlackThreat(threat) {
        this.threatnedByBlack = threat;
    }

    setWhiteThreat(threat) {
        this.threatnedByWhite = threat;
    }

    clearSpace(){
        this.piece = undefined;
    }

    setPiece(piece) {
        if (this.piece !== undefined) {
            var a = this.piece;
            if (this.getPiece().team !== piece.team) {
                var index = livingPieces.indexOf(this.piece);
                livingPieces.splice(index, 1);
                this.piece = piece;
                piece.setPos(this.position);
                calcThreat();
                return true;
            } else {
                return false;
            }
        } else {
            var oldSpace = map[piece.getStringPos()];
            oldSpace.clearSpace();
            this.piece = piece;
            piece.setPos(this.position);
            calcThreat();
            return true;
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

class Piece {
    constructor(Position, Team) {
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    setPos(Position) {
        this.position = Position;
    }

    possiblemoves(){
        return [];
    }

    getStringPos(){
        return this.position.getPos();
    }
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
                if(isVacant(new Position(toLeft, oneMoveForward))!== null && isVacant(new Position(toLeft, oneMoveForward)).team === "Black"){
                    dictPossibleMoves.push(new Position(toLeft, oneMoveForward));
                }
            }
            return dictPossibleMoves
        } else {
            // Black pawn
            let oneMoveForward = this.position.getY() - 1;
            //first move
            if(this.position.getY() == 7){
                if(isVacant(new Position(this.position.getX(), oneMoveForward))===null) {
                    dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward));
                    if(isVacant(new Position(this.position.getX(), oneMoveForward - 1))===null){
                        dictPossibleMoves.push(new Position(this.position.getX(), oneMoveForward - 1));
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
                if(isVacant(new Position(toLeft, oneMoveForward))!== null && isVacant(new Position(toLeft, oneMoveForward)).team === "White"){
                    dictPossibleMoves.push(new Position(toLeft, oneMoveForward));
                }
            }
        }
        return dictPossibleMoves;
    }

    setPos(Position) {
        this.position = Position;
    }

     getStringPos(){
         return this.position.getPos();
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



class Rook {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    setPos(Position){
        this.position = Position;
    }

    getStringPos(){
        return this.position.getPos();
    }

    possiblemoves(){
        var dict = [];
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
        return dict;
    }
}

class Knight {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }
    setPos(Position) {
        this.position = Position;
    }

    getStringPos(){
        return this.position.getPos();
    }

    moveSides(right, direction, moves) {
        var xPos = this.position.getX();
        var yPos = this.position.getY();
        xPos = moveXpos(xPos, right);
        if(xPos === null) {
                return moves;
        }
        yPos += direction
        if(yPos <= 0 || yPos >= 8) {
            return moves;
        }
        var pos = new Position(xPos, yPos);
        if (isVacant(pos) == null || isVacant(pos).team != this.team) {
            moves.push(pos);
        }
        return moves;
    }

    possiblemoves(){
        var moves = [];
        this.moveSides(2, 1, moves);
        this.moveSides(2, -1, moves);
        this.moveSides(-2, 1, moves);
        this.moveSides(-2, -1, moves);

        this.moveSides(1, 2, moves);
        this.moveSides(1, -2, moves);
        this.moveSides(-1, 2, moves);
        this.moveSides(-1, -2, moves);



        return moves;
    }
}

class Bishop {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    setPos(Position) {
        this.position = Position;
    }

    getStringPos(){
        return this.position.getPos();
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
        return dict;
    }
}

class Queen {
    constructor(Position, Team) {
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    setPos(Position) {
        this.position = Position;
    }

    getStringPos(){
        return this.position.getPos();
    }

    possiblemoves(){
        var dict = [];
        var xPos = this.position.getX();
        var yPos = this.position.getY();
        //Right up
        crossmoves(dict, this, 1, true);
        //Left up
        crossmoves(dict, this, 1, false);
        //Right down
        crossmoves(dict, this, -1, true);
        //Left down
        crossmoves(dict, this, -1, false);
        //Left
        movesLeftRight(dict, this, false);
        //Right
        movesLeftRight(dict, this, true);
        //Up
        movesUpDown(dict, this, 1);
        //Down
        movesUpDown(dict, this, -1);
        return dict;
    }
}

class King {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    setPos(Position) {
        this.position = Position;
    }

    getStringPos(){
        return this.position.getPos();
    }

    isKingMovePosibble(pos, moves) {
        if (map[pos.getPos()] !== undefined && (isVacant(pos) === null || isVacant(pos).team !== this.team)) {
            if ((this.team === "White" && !map[pos.getPos()].getBlackThreat()) || (this.team === "Black" && !map[pos.getPos()].getWhiteThreat()) ) {
                moves.push(pos);
            }
        }
        return moves;
    }

    possiblemoves() {
        var moves = [];
        //up
        var pos = new Position(this.position.getX(), this.position.getY() + 1);
        this.isKingMovePosibble(pos, moves);
        //down
        var pos = new Position(this.position.getX(), this.position.getY() - 1);
        this.isKingMovePosibble(pos, moves);
        //Left
        pos = new Position(moveXpos(this.position.getX(), true), this.position.getY());
        this.isKingMovePosibble(pos, moves);
        //Right
        pos = new Position(moveXpos(this.position.getX(), false), this.position.getY());
        this.isKingMovePosibble(pos, moves);
        //diagonal
        pos = new Position(moveXpos(this.position.getX(), false), this.position.getY() -1);
        this.isKingMovePosibble(pos, moves);
        pos = new Position(moveXpos(this.position.getX(), true), this.position.getY() -1);
        this.isKingMovePosibble(pos, moves);
        pos = new Position(moveXpos(this.position.getX(), false), this.position.getY() +1);
        this.isKingMovePosibble(pos, moves);
        pos = new Position(moveXpos(this.position.getX(), true), this.position.getY() +1);
        this.isKingMovePosibble(pos, moves);
        return moves;
    }
}

function movesLeftRight(dict, piece, toTheRight){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while(true){
        xPos = moveXpos(xPos, toTheRight);
        if (xPos == null){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.push(newPos);
        } else if (isVacant(newPos).team !== piece.team){
            dict.push(newPos);
            break;
        }
    }
}

function movesUpDown(dict, piece, direction){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while (true){
        yPos = yPos + direction;
        if (yPos > 8 || yPos < 1){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.push(newPos);
        } else if (isVacant(newPos).team != piece.team){
            dict.push(newPos);
            break;
        }
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

function moveXpos(xPos, toTheRight) {
    var xPositions = ["A","B", "C", "D", "E", "F", "G", "H"];
    var x = xPos.toUpperCase();
    var pos = xPositions.indexOf(x)+1;
    if(toTheRight === true) toTheRight = 1;
    else if(toTheRight === false) toTheRight = -1;

    if(pos+toTheRight <= 0) return null;
    else if(pos+toTheRight >= 9) return null;

    return xPositions[pos+toTheRight-1];
}

function calcThreat() {
    var keys = Object.keys(map);
    for(var i = 0; i < keys.length;i++){
        var space = map[keys[i]];
        space.setWhiteThreat(false);
        space.setBlackThreat(false);
    }
    for (i = 0; i < livingPieces.length; i++) {
        var piece = livingPieces[i];
        var team = piece.team;
        var threasts = piece.possiblemoves();
        for (k = 0; k < threasts.length; k++) {
            var position = threasts[k];
            var Space = map[position.getPos()];
            if(team==="Black") {
                Space.setBlackThreat(true);
            } else if (team==="White") {
                Space.setWhiteThreat(true);
            }
        }
    }
}

function addBlackPieces() {
    var team = "Black"
    var position = new Position("A", 8)
    new Rook(position, team);
    var position = new Position("B", 8)
    new Knight(position, team);
    var position = new Position("C", 8)
    new Bishop(position, team);
    var position = new Position("D", 8)
    new Queen(position, team);
    var position = new Position("E", 8)
    new King(position, team);
    var position = new Position("F", 8)
    new Bishop(position, team);
    var position = new Position("G", 8)
    new Knight(position, team);
    var position = new Position("H", 8)
    new Rook(position, team);

    //pawns
    for (i = 0; i < 8; i++) {
        var position = new Position(moveXpos("A", i), 7);
        new Pawn(position, team);
    }
}

function addWhitePieces() {
    var team = "White"
    var position = new Position("A", 1)
    new Rook(position, team);
    var position = new Position("B", 1)
    new Knight(position, team);
    var position = new Position("C", 1)
    new Bishop(position, team);
    var position = new Position("D", 1)
    new Queen(position, team);
    var position = new Position("E", 1)
    new King(position, team);
    var position = new Position("F", 1)
    new Bishop(position, team);
    var position = new Position("G", 1)
    new Knight(position, team);
    var position = new Position("H", 1)
    new Rook(position, team);

    //pawns
    for (i = 0; i < 8; i++) {
        var position = new Position(moveXpos("A", i), 2);
        new Pawn(position, team);
    }
}



