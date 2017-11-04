

function position (xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
}

position.prototype.getPosition = function() {
    return this.xpos+this.ypos;
};

