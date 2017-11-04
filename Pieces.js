

function Position (xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
}

Position.prototype.getPosition = function() {
    return this.xpos+this.ypos;
};

