var width = 10;
var height = 30;
var velocity = 200;
var output = '';
var drawCompleted = false;
var targetY = 0;
var isPause = false;

var Mass = function(x, y) {
  return {
    x: x || 0,
    y: y || 0,
    color: 'green'
  };
};

var MassConverter = function() {
  return {
    convert: function(brick, idInRepo) {
      var base = brick.base;
      for (var i = 0; i < brick.body.length; i++) {
        var coord = brick.body[i];
      }
    }
  };
}();

var MassRepo = [
  new Mass()
];

var Positions = {
  n: 0,
  e: 1,
  s: 2,
  w: 3,
  default: 0
};

var KeysPressed = function() {
  return {
    left: false,
    right: false,
    up: false,
    down: false,
    reset: function() {
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
    }
  };
}();

/*

 #
##
{x: 0, y: 0}, 
{x: 0, y: 1},
{x: -1, y: 1}

##
 #
{x: 0, y: 0}, 
{x: 0, y: 1},
{x: 0, y: 1}

-----------

#
#
##
{x: 0, y: 0}, 
{x: 0, y: 1}, 
{x: 0, y: 2},
{x: 1, y: 2} 

  #
###
{x: 0, y: 0}, 
{x: 0, y: 1}, 
{x: -1, y: 1},
{x: -2, y: 1} 

##
 #
 #
{x: 0, y: 0}, 
{x: -1, y: 0}, 
{x: -1, y: 1},
{x: -1, y: 2} 

###
#
{x: 0, y: 0}, 
{x: -1, y: 0}, 
{x: -2, y: 0},
{x: -2, y: 1} 

*/

// #
// #
// ##
var Brick = function(positions, basePosition, brickBody) {
  var _base = {x: 5, y: 0};
  var _positionCoords = positions || [];
  var _position = basePosition || Positions.default;
  var _body = brickBody || _positionCoords[_position].coords;

  return {
    position: _position,
    base: _base,
    body: _body,
    frozen: false, // TODO deprecated because of mass repo
    color: 'blue', // TODO
    getRelativeX: function() {
      var relativeX = this.base.x;
      for (var i = 0; i < this.body.length; i++) {
        var bodyPart = this.base.x + this.body[i].x;
        if (bodyPart > relativeX) {
          relativeX = bodyPart;
        }
      }
      return relativeX;
    },
    getRelativeY: function() {
      // TODO refactor duplicate code
      var relativeY = this.base.y;
      for (var i = 0; i < this.body.length; i++) {
        var bodyPart = this.base.y + this.body[i].y;
        if (bodyPart > relativeY) {
          relativeY = bodyPart;
        }
      }
      return relativeY;
    },
    getMinRelativeX: function() {
      // TODO refactor duplicate code
      var minRelativeX = this.base.x;
      for (var i = 0; i < this.body.length; i++) {
        var bodyPart = this.base.x - (this.body[i].x < 0 ? Math.abs(this.body[i].x) : 0);
        if (bodyPart < minRelativeX) {
          minRelativeX = bodyPart;
        }
      }
      return minRelativeX;
    },
    fixXOutOfBounds: function() {
    	
    },
    isYOutOfBounds: function() {
    	return this.getRelativeY() > height;
    },
    isXOutOfBounds: function() {
		return !this.getMinRelativeX() || this.getRelativeX() > width;
    },
    moveUp: function() {
      if (!this.frozen) {
      	this.rotate(false);
      }
    },
    moveDown: function() {
      if (height <= this.getRelativeY()) {
        this.frozen = true;
      } 
      if (!this.frozen) {
        this.base.y++;
      }
    },
    moveLeft: function() {
      if (this.getMinRelativeX() && !this.frozen) {
        this.base.x--;
      }

      if (this.isXOutOfBounds()) {
      	this.fixXOutOfBounds();
      }
    },
    moveRight: function() {
      if (this.getRelativeX() < width && !this.frozen) {
        this.base.x++;
      }

      if (this.isXOutOfBounds()) {
      	this.fixXOutOfBounds();
      }
    },
    rotate: function(clockwise) {
  	  var currentPosition = this.position;
  	  if (currentPosition > Positions.w) {
  	  	currentPosition = Positions.n;
  	  } else if (currentPosition === Positions.n && !clockwise) {
  	  	currentPosition = Positions.w;
  	  } else if (clockwise) {
  	  	currentPosition++;
  	  } else {
  	  	currentPosition--;
  	  }



  	  this.body = _positionCoords[currentPosition].coords;
  	  this.position = _positionCoords[currentPosition].position;
    },
    print: function() {
      if (KeysPressed.left) {
        this.moveLeft();
      } else if (KeysPressed.right) {
        this.moveRight();
      } else if (KeysPressed.up) {
        this.moveUp();
      }

      KeysPressed.reset();

      if (!this.frozen) {
        return '<span class="brick" style="color: ' + this.color +';">&#9776;</span>';
      } else {
        return '<span class="frozen" style="color: black;">&#9776;</span>';
      }
    }
  };
};

var brickRepo = [new Brick([
  	{
  		position: Positions.n,
  		coords: [
  			{x: 0, y: 0}, 
			{x: 0, y: 1}, 
			{x: 0, y: 2},
			{x: 1, y: 2}]
  	},
  	{
  		position: Positions.e,
  		coords: [
  			{x: 0, y: 0}, 
			{x: 0, y: 1}, 
			{x: -1, y: 1},
			{x: -2, y: 1}]
  	},
  	{
  		position: Positions.s,
  		coords: [
  			{x: 0, y: 0}, 
			{x: -1, y: 0}, 
			{x: -1, y: 1},
			{x: -1, y: 2}]
  	},
  	{
  		position: Positions.w,
  		coords: [
  			{x: 0, y: 0}, 
			{x: -1, y: 0}, 
			{x: -2, y: 0},
			{x: -2, y: 1}]
  	}
  ])];

var refreshBrickRepo = function(positionPressed) {
  for (var i = 0; i < brickRepo.length; i++) {
    brickRepo[i].moveDown();
  }
};

var shouldDrawBrick = function(x, y, brickToDraw) {
  var base = brickToDraw.base;
  for (var i = 0; i < brickToDraw.body.length; i++) {
    var relativeX = brickToDraw.body[i].x + base.x;
    var relativeY = brickToDraw.body[i].y + base.y;
    if (y === relativeY && x === relativeX) {
      return true;
    }
  }
  return false;
};

var printFrame = function() {
  output = '';
  drawCompleted = false;
  refreshBrickRepo(); 
  for (var y = 0; y <= height; y++) {
    for (var x = 0; x <= width; x++) {
      for (var i = 0; i < brickRepo.length; i++) {
        var brick = brickRepo[i];
        if (targetY > height) {
          // Start over
          targetY = 0;
          // TODO refactor duplicate code
          output += '<span class="bg" style="color: red;">&#9783;</span>';
        } else if (shouldDrawBrick(x, y, brick)) {
          // Draw brick state
          output += brickRepo[0].print();
          drawCompleted = true;
          targetY++;
        } else {
          output += '<span class="bg" style="color: red;">&#9783;</span>';
        }
      }
    }
    output += '<br/>';
  }
  document.body.innerHTML = output;
};

var renderLoop = function(printCnt) {
  setInterval(printCnt, velocity);
}(printFrame);

document.body.addEventListener("load", renderLoop);
document.body.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) {
    KeysPressed.left = true;
  } else if (e.keyCode === 39) {
    KeysPressed.right = true;
  } else if (e.keyCode === 40) {
    KeysPressed.down = true;
  } else if (e.keyCode === 38) {
    KeysPressed.up = true;
  }
});