function Dungeon(idCanvas, tileWidth, tileHeight) {
  this.canvas = $("#" + idCanvas)[0];
  // this.canvas = document.getElementById(idCanvas);
  this.context = this.canvas.getContext("2d");

  this.tileWidth = tileWidth;
  this.tileHeight = tileHeight;
  this.tiles = [new Tile(this.tileWidth, this.tileHeight, true, "white"), new Tile(this.tileWidth, this.tileHeight, false, "black")];
  this.map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  this.canvas.width = this.tileWidth * this.map[0].length;
  this.canvas.height = this.tileHeight * this.map.length;

  this.drawMap();
}

Dungeon.prototype.drawMap = function() {
  var xMax = this.map[0].length;
  var yMax = this.map.length;

  for (var y = 0; y < yMax; y++) {
    for (var x = 0; x < xMax; x++) {
      this.tiles[this.map[y][x]].drawTile(this.context, x, y);
    }
  }
};

function Tile(width, height, isObstacle, background) {
  this.width = width;
  this.height = height;
  this.isObstacle = isObstacle;
  this.background = background;
}

Tile.prototype.drawTile = function(context, x, y) {
  context.fillStyle = this.background;
  context.fillRect(this.width * x, this.height * y, this.width, this.height);
};
