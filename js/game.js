// Global variables

var dungeon;

var constants = {
    TILE_WIDTH: 48,
    TILE_HEIGHT: 48,
};

window.onload = function() {
  dungeon = new Dungeon("game-canvas", constants.TILE_WIDTH, constants.TILE_HEIGHT);
};
