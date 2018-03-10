var Snowfall = (function () {
    this.parameters = {
        color: "lightblue",
        snowflakesNumber: 500
    }

    var context;
    var snowflakes = [];
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;

    function Snowflake(y) {
        this.x = Math.random() * maxWidth;
        this.y = y;
        this.radius = Math.random() * 2;
        this.weight = Math.random() * 0.1;
        this.angle = Math.random() * Math.PI * 2;

        this.fall = function() {
            this.x += Math.sin(this.angle) * 0.3;
            this.y += Math.pow(this.weight, 2) + 0.5;
            this.angle += 0.01;
            if (this.angle >= Math.PI*2) {
                this.angle = 0;
            }
        }
    }

    var init = function () {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("style", "position: absolute; z-index: 9999999; top: 0; left: 0;")
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context = canvas.getContext("2d");

        for (var i = 0; i < parameters.snowflakesNumber; i++) {
            snowflakes.push(new Snowflake(Math.random() * maxHeight));
        }
    }

    var drawSnowflakes = function () {
        context.clearRect(0, 0, maxWidth, maxHeight);
        context.fillStyle = parameters.color;
        context.beginPath();

        for (var i = 0; i < parameters.snowflakesNumber; i++) {
            var snowflake = snowflakes[i];
            context.moveTo(snowflake.x, snowflake.y);
            context.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
        }
        context.fill();

        moveSnowflakes();
    }

    var moveSnowflakes = function () {
        for (var i = 0; i < parameters.snowflakesNumber; i++) {
            var snowflake = snowflakes[i];
            snowflake.fall();
            if (snowflake.y > maxHeight) {
                snowflakes[i] = new Snowflake(0);
            }
        }
    }

    return {
        start: function() {
            init();
            setInterval(drawSnowflakes, 20);
        }
    }
})();