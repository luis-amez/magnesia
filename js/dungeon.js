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

  this.mage = undefined;
  this.startMage();

  var self = this;
  this.elapsedTime = new Date().getTime();
  this.intervalId = setInterval(function() {
    self.display();
  }, 25);

  // this.drawMap();
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

Dungeon.prototype.startMage = function() {
  this.mage = new Mage(this, (2/3)*this.tileWidth, (3/4)*this.tileHeight, 1.5, 7);
  var self = this;

  // Try jQuery
  document.body.onkeydown = function(event) {
    switch (event.keyCode) {
      case 38:
        event.preventDefault();
        self.mage.up = true;
        break;
      case 40:
        event.preventDefault();
        self.mage.down = true;
        break;
      case 39:
        event.preventDefault();
        self.mage.right = true;
        break;
      case 37:
        event.preventDefault();
        self.mage.left = true;
        break;
    }
  };

  document.body.onkeyup = function(event) {
    switch (event.keyCode) {
      case 38:
        event.preventDefault();
        self.mage.up = false;
        break;
      case 40:
        event.preventDefault();
        self.mage.down = false;
        break;
      case 39:
        event.preventDefault();
        self.mage.right = false;
        break;
      case 37:
        event.preventDefault();
        self.mage.left = false;
        break;
    }
  };
};

Dungeon.prototype.isTileAnObstacle = function(xCoordinate, yCoordinate) {
  var x = parseInt(xCoordinate);
  var y = parseInt(yCoordinate);
  return this.tiles[this.map[y][x]].isObstacle;
};

Dungeon.prototype.display = function() {
  var time = (new Date().getTime()) - this.elapsedTime;
  this.elapsedTime = new Date().getTime();

  this.moveCharacters(time);
  this.drawMap();
  this.drawCharacters();
};

Dungeon.prototype.moveCharacters = function(time) {
  this.mage.moveMage(time);
};

Dungeon.prototype.drawCharacters = function() {
  this.mage.drawMage(this.context);
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
