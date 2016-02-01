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
  var _base = {x: 0, y: 0};
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
    body: _body
  }
};

var shouldPrintBrick = function(brick, x, y) {
  var draw = false;
  for (var i = 0; brick.body.length < i; i++) {
    var bX = brick.body[i].x;
    var bY = brick.body[i].y;
    bX = +sum(x)(bX);
    bY = +sum(y)(bY);
  }
  if (x == bX || y == bY || (!y && bX) || (!x && !bY) ) {
    return true;
  }

  return false;
}; 

var printFrame = function() {
  output = '';
  drawCompleted = false;
  var targetX = parseInt(height / 2);
  var objectToDraw = {
    position: Positions.default,
    base: {x: 0, y: 0},
    body: [
      {x: 0, y: 0}, 
      {x: 0, y: -1}, 
      {x: 1, y: 0}, 
      {x: 0, y: -2}
    ]
  };
  for (var i = 0; i <= height; i++) {
    for (var j = 0; j <= width; j++) {
      if (targetY > height) {
        // Start over
        targetY = 0;
        // TODO refactor duplicate code
        output += '<span style="color: red;">&#9783;</span>';
      } else if ((j == targetX && 
          i == targetY && 
          !drawCompleted) || shouldPrintBrick(new Brick()))
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