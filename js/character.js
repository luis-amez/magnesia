function Character(dungeon, width, height, xCenter, yCenter, sprite) {
  this.dungeon = dungeon;

  this.width = width;
  this.height = height;
  this.xCenter = xCenter;
  this.yCenter = yCenter;
  this.xMovement = 0;
  this.yMovement = 0;
  this.speed = 0.002;

  this.sprite = sprite;
  this.orientation = "down";
  this.spriteIndex = 0;
  this.spriteTransition = 50;
  this.transition = 0;
}

Character.prototype.drawCharacter = function(context) {
  context.save();
  context.translate(this.xCenter * dungeon.tileWidth, this.yCenter * dungeon.tileHeight);
  this.sprite.drawSprite(context, this.width, this.height, this.orientation, this.spriteIndex);
  context.restore();
};

Character.prototype.isValidPosition = function(xPos, yPos) {
  var width = this.width / (2 * dungeon.tileWidth);
  var height = this.height / (2 * dungeon.tileHeight);

  if (dungeon.isTileAnObstacle(xPos - width, yPos - height)) {
    return false;
  }
  if (dungeon.isTileAnObstacle(xPos + width, yPos - height)) {
    return false;
  }
  if (dungeon.isTileAnObstacle(xPos - width, yPos + height)) {
    return false;
  }
  if (dungeon.isTileAnObstacle(xPos + width, yPos + height)) {
    return false;
  }

  return true;
};

Character.prototype.moveCharacter = function(time) {
  var newOrientation = "";

  if (this.xMovement === 0 && this.yMovement === 0) {
    return;
  }

  var xCenter = this.xCenter + this.xMovement * this.speed * time;
  var yCenter = this.yCenter + this.yMovement * this.speed * time;

  if (this.xCenter === xCenter && this.yCenter === yCenter) {
    return;
  }

  this.xCenter = xCenter;
  this.yCenter = yCenter;

  if (this.dy > 0) {
    newOrientation = "down";
  }
  if (this.dy < 0) {
    newOrientation = "up";
  }
  if (this.dx > 0) {
    newOrientation = "right";
  }
  if (this.dx < 0) {
    newOrientation = "left";
  }
  if (this.orientation !== newOrientation) {
    this.transition = 0;
    this.spriteIndex = 0;
    this.orientation = newOrientation;
  }

  this.transition += time;

  if (this.transition > this.spriteTransition) {
    this.transition = 0;
    this.spriteIndex = (this.spriteIndex + 1) % this.sprite.getNumberSprites(newOrientation);
  }
};

function Mage(dungeon, width, height, xCenter, yCenter) {
  Character.call(this, dungeon, width, height, xCenter, yCenter, sprites.getSprite("mage"));
  this.up = false;
  this.down = false;
  this.right = false;
  this.left = false;
}

Mage.prototype = new Character;

Mage.prototype.moveMage = function(time) {
  this.xMovement = 0;
  this.yMovement = 0;

  if (this.up) {
    this.yMovement -= 1;
  }
  if (this.down) {
    this.yMovement += 1;
  }
  if (this.left) {
    this.xMovement -= 1;
  }
  if (this.right) {
    this.xMovement += 1;
  }
  Character.prototype.moveCharacter.call(this, time);
};

Mage.prototype.drawMage = function(context) {
  Character.prototype.drawCharacter.call(this, context);
};
