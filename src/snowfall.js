var Snowfall = (function () {
  var _context;
  var _parameters = {
    color: "white",
    snowflakesNumber: 500
  };
  var _snowflakes = [];
  var _maxWidth = window.innerWidth;
  var _maxHeight = window.innerHeight;

  function Snowflake(y) {
    this.x = Math.random() * _maxWidth;
    this.y = y;
    this.radius = Math.random() * 2;
    this.weight = Math.random() * 0.1;
    this.angle = Math.random() * Math.PI * 2;

    this.fall = function () {
      this.x += Math.sin(this.angle) * 0.1;
      this.y += Math.pow(this.weight, 2) + 0.3;
      this.angle += 0.01;
      if (this.angle >= Math.PI * 2) {
        this.angle = 0;
      }
    }
  }

  var init = function (parameters) {
    if (parameters) {
      _parameters = parameters;
    }
    var canvas = document.createElement("canvas");
    canvas.setAttribute("style", "position: absolute; z-index: 9999999; top: 0; left: 0;")
    document.body.appendChild(canvas);
    canvas.width = _maxWidth;
    canvas.height = _maxHeight;

    _context = canvas.getContext("2d");

    for (var i = 0; i < _parameters.snowflakesNumber; i++) {
      _snowflakes.push(new Snowflake(Math.random() * _maxHeight));
    }
  };

  var drawSnowflakes = function () {
    _context.clearRect(0, 0, _maxWidth, _maxHeight);
    _context.fillStyle = _parameters.color;
    _context.beginPath();

    for (var i = 0; i < _parameters.snowflakesNumber; i++) {
      var snowflake = _snowflakes[i];
      _context.moveTo(snowflake.x, snowflake.y);
      _context.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
    }
    _context.fill();

    moveSnowflakes();
  };

  var moveSnowflakes = function () {
    for (var i = 0; i < _parameters.snowflakesNumber; i++) {
      var snowflake = _snowflakes[i];
      snowflake.fall();
      if (snowflake.y > _maxHeight) {
        _snowflakes[i] = new Snowflake(0);
      }
    }
  };

  return {
    start: function (parameters) {
      init(parameters);
      setInterval(drawSnowflakes, 20);
    }
  }
})();