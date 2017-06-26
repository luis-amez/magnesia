function Sprite(source) {
  this.source = source;
  this.sprites = [];
}

Sprite.prototype.setSprite = function(sprite, coordinates) {
  this.sprites[sprite] = coordinates;
};

Sprite.prototype.createSprite = function(rows, columns, sprites) {
  var width = this.source.width / columns;
  var height = this.source.height / rows;

  for (var sprite in sprites) {
    this.sprites[sprite] = [];
    for (var i = 0; i < columns; i++) {
      this.sprites[sprite].push([i*width, sprites[sprite]*height, (i+1)*width, (sprites[sprite]+1)*height]);
    }
  }

  // ¡¡¡Comprobar si funciona!!!
  // sprites.forEach(function(sprite) {
  //   this.sprites[sprite] = [];
  //   for (var i = 0; i < columns; i++) {
  //     this.sprites[sprite].push([i*width, sprites[sprite]*height, (i+1)*width, (sprites[sprite]+1)*height]);
  //   }
  // }, this);

};

Sprite.prototype.getNumberSprites = function(sprite) {
  return this.sprites[sprite].length;
};

Sprite.prototype.drawSprite = function(context, width, height, sprite, index) {
  context.drawImage(this.source, this.sprites[sprite][index][0],
                                 this.sprites[sprite][index][1],
                                 this.sprites[sprite][index][2] - this.sprites[sprite][index][0],
                                 this.sprites[sprite][index][3] - this.sprites[sprite][index][1],
                                 -width/2, -height/2, width, height);
};

function SpritesStorage() {
  this.storedSprites = [];
}

SpritesStorage.prototype.addSprite = function(id, sprite) {
  this.storedSprites[id] = sprite;
};

SpritesStorage.prototype.getSprite = function(id) {
  return this.storedSprites[id];
};

function ImagesStorage() {
  this.storedImages = [];
  this.expected = 0;
  this.loaded = 0;
}

ImagesStorage.prototype.loadImages = function(images) {
  var self = this;
  this.expected = images.length;
  for (var i = 0; i < this.expected; i++) {
    var image = new Image();
    image.src = images[i][1];
    image.onload = function() {
      self.imageIsLoaded();
    };
    this.storedImages[images[i][0]] = image;
  }
};

ImagesStorage.prototype.imageIsLoaded = function() {
  this.loaded++;
  if (this.loaded === this.expected) {
    this.completed();
  }
};

ImagesStorage.prototype.getImage = function(id) {
  return this.storedImages[id];
};

ImagesStorage.prototype.completed = function() {};
