var width = 40;
var height = 30;
var velocity = 200;
var output = '';
var drawCompleted = false;
var targetY = 0;

// #
// #
// ##
var obj1 = {
	base: 0, [
  	{x: 0 y: 0}, 
    {x: 0 y: -1}, 
    {x: 1 y: 0}, 
    {x: 0 y: -2}
  ]
};

setInterval(function() {
	output = '';
	drawCompleted = false;
  var targetX = 20;
	
  for (var i = 0; i <= height; i++) {
  	for (var j = 0; j <= width; j++) {
    	if (targetY == height) {
      	targetY = 0;
      }
      else if (j == targetX && 
      		i == targetY && 
          !drawCompleted)
      {
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
}, velocity);


