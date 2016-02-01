var width = 40;
var height = 30;
var velocity = 200;
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
  var position = Positions.default;
  var base = {x: 0, y: 0};
  var body = [
    {x: 0, y: 0}, 
    {x: 0, y: -1}, 
    {x: 1, y: 0}, 
    {x: 0, y: -2}
  ];
  
  if (basePosition) {
    position = basePosition;
  }
  if (body) {
     body = brickBody;
  }
  
  return {
    position: position,
    base: base,
    body: body
  }
};

var printFrame = function() {
  output = '';
  drawCompleted = false;
  var targetX = 20;
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
      if (targetY == height) {
        // Start over
        targetY = 0;
      }
      else if (j == targetX && 
          i == targetY && 
          !drawCompleted)
      {
        // Draw brick state
        output += '_';
        drawCompleted = true;
        targetY++;
      } else {
        output += '#';
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