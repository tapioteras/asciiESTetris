var width = 30;
var height = 30;
var velocity = 100;
var output = '';
var drawCompleted = false;
var targetY = 0;

var Positions = {
  n: 0,
  e: 1,
  s: 2,
  w: 3,
  default: 0
}

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
      _base.x = _base.x - 1;
    },
    moveRight: function() {
      _base.x = _base.x + 1;
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
  return base.x === x && base.y === y;
};

var printFrame = function() {
  output = '';
  drawCompleted = false;
  var targetX = parseInt(height / 2);
  
  for (var i = 0; i <= height; i++) {
    for (var j = 0; j <= width; j++) {
      if (targetY > height) {
        // Start over
        targetY = 0;
        // TODO refactor duplicate code
        output += '<span style="color: red;">&#9783;</span>';
      } else if ((j == targetX && 
          i == targetY && 
          !drawCompleted) || shouldDrawBrick(j, i, brickRepo[0]))
      {
        // Draw brick state
        output += '<span style="color: blue;">&#9776;</span>';
        drawCompleted = true;
        targetY++;
      } else {
        output += '<span style="color: red;">&#9783;</span>';
      }
    }
    output += '<br/>';
  }
  refreshBrickRepo();
  document.body.innerHTML = output;
  i++;
};

var renderLoop = function(printCnt) {
  var worldState = {
    objects: []
  };
  setInterval(printCnt, velocity);
}(printFrame);

document.body.addEventListener("load", renderLoop);
document.body.addEventListener('keydown', function(e) {
    // todo: bind arrow keys!
    //msg.textContent = 'keydown:' + e.keyCode;
});