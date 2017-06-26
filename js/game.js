// Global variables

var dungeon;
var sprites;
var images;

var constants = {
    TILE_WIDTH: 48,
    TILE_HEIGHT: 48,
};

window.onload = function() {
  images = new ImagesStorage();
  sprites = new SpritesStorage();

  images.loadImages([
    ["wizard", "img/wizard.png"]
  ]);

  images.completed = function() {
    var spriteMage = new Sprite(images.getImage("wizard"));
    spriteMage.createSprite(4,3,{"up":0,"down":2,"right":1,"left":3});
    sprites.addSprite("mage", spriteMage);
    dungeon = new Dungeon("game-canvas", constants.TILE_WIDTH, constants.TILE_HEIGHT);
  };
};
