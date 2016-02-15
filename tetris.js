var width = 30;
var height = 30;
var velocity = 100;
var output = '';
var drawCompleted = false;
var targetY = 0;
var isPause = false;


var Mass = {
  x: 0,
  y: 0,
  color: 'black'
};

var MassConverter = function() {
  return {
    convert: function(brick, idInRepo) {
      var base = brick.base;
      for (var i = 0; i < brick.body.length; i++) {
        var coord = brick.body[i];

      }
    }
  }
}();

var MassRepo = [];

var Positions = {
  n: 0,
  e: 1,
  s: 2,
  w: 3,
  default: 0
}

var KeysPressed = {
  left: false,
  right: false,
  up: false,
  down: false,
  reset: function () {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }
};

// #
// #
// ##
var Brick = function(basePosition, drawBase, brickBody) {
  var _position = Positions.default;
  var _base = {x: 15, y: 0};
  var _body = [
    {x: 0, y: 0}, 
    {x: 0, y: -1}, 
    {x: 1, y: 0}, 
    {x: 0, y: -2}
  ];
  
  if (basePosition) {
    _position = basePosition;
  }
  if (brickBody) {
     _body = brickBody;
  }

  return {
    position: _position,
    base: _base,
    body: _body,
    frozen: false, // TODO
    color: 'blue', // TODO
    moveDown: function() {
      if (height <= _base.y) {
        this.frozen = true;
      } 
      if (!this.frozen) {
        _base.y = _base.y + 1;
      }
    },
    moveLeft: function() {
      if (_base.x) {
        _base.x = _base.x - 1;
      }
    },
    moveRight: function() {
      if (_base.x <= width) {
        _base.x = _base.x + 1;
      }
    },
    print: function() {
      if (KeysPressed.left) {
        this.moveLeft();
      } else if (KeysPressed.right) {
        this.moveRight();
      }

      if (!this.frozen) {
        return '<span style="color: ' + this.color +';">&#9776;</span>';
      } else {
        return '<span style="color: black;">&#9776;</span>';
      }
    }
  }
};

var brickRepo = [new Brick()];

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
    if (y === relativeY) {
      if (x === relativeX) {
        return true;
      }
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
          output += '<span style="color: red;">&#9783;</span>';
        } else if (( 
            y == targetY && 
            !drawCompleted) || shouldDrawBrick(x, y, brick))
        {
          // Draw brick state
          output += brickRepo[0].print();
          drawCompleted = true;
          targetY++;
        } else {
          output += '<span style="color: red;">&#9783;</span>';
        }
      }
    }
    output += '<br/>';
  }

  document.body.innerHTML = output;
  KeysPressed.reset();
};

var renderLoop = function(printCnt) {
  setInterval(printCnt, velocity);
}(printFrame);

document.body.addEventListener("load", renderLoop);
document.body.addEventListener('keydown', function(e) {
    if (e.keyCode == 37) {
      KeysPressed.left = true;
    } else if (e.keyCode == 39) {
      KeysPressed.right = true;
    }
});