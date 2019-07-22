"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function to_pixel(val_m, metre_total, pixel_total) {
  return val_m * (pixel_total / metre_total);
}
/**
 * Chiri the Bird
 * Flappy the Chiri Bird
 */


var Chiri =
/*#__PURE__*/
function () {
  // metres from ground level
  // m/s
  // dydt
  // kg
  // Newton
  function Chiri() {
    _classCallCheck(this, Chiri);

    _defineProperty(this, "max_height", 6);

    _defineProperty(this, "y", 8);

    _defineProperty(this, "gravity", -9.8);

    _defineProperty(this, "velocity", 0);

    _defineProperty(this, "last_time", 0);

    _defineProperty(this, "mass", 10);

    _defineProperty(this, "jump_force_value", 1000);

    _defineProperty(this, "size", 0.20);

    _defineProperty(this, "forces", {
      gravity: this.mass * this.gravity
    });
  }

  _createClass(Chiri, [{
    key: "reset",
    value: function reset() {
      this.y = 8;
      this.removeForce();
      this.velocity = 0; // this.last_time = 0;
    }
  }, {
    key: "getForce",
    value: function getForce() {
      var _this = this;

      var total_force = 0;
      Object.keys(this.forces).forEach(function (key, index) {
        total_force += _this.forces[key];
      });
      console.log("Force: " + total_force);
      return total_force;
    }
  }, {
    key: "draw",
    value: function draw(canvas_height, canavs_width, ctx, size) {
      // console.log("ok");

      /*
      max_height * x = canvas_height;
      x = canvas_height / max_height
        virtual_ht * x = real_ht
      */
      size = to_pixel(this.size, this.max_height, canvas_height);
      ctx.fillStyle = "red";
      var x0 = canavs_width / 2 - size / 2;
      var y0 = canvas_height - canvas_height / this.max_height * this.y - size / 2;
      var x1 = size;
      var y1 = size / 2 + size / 2; // console.log(x0, y0, x1, y1);

      ctx.fillRect(x0, y0, x1, y1);
    }
  }, {
    key: "update",
    value: function update(time) {
      if (this.y === 0) this.addForce("R", Math.max(0, this.getForce()));else if (this.y === this.max_height) this.addForce("R", Math.min(0, this.getForce()));else this.addForce("R", 0);
      var time_change = (time - this.last_time) / 1000; // time = time / 1000

      var acceleration = this.getForce() / this.mass; // calculate final velocity

      var final_velocity = this.velocity + acceleration * time_change; // update position
      // v^2 - u^2 = 2as

      var displacement;
      var numerator = final_velocity * final_velocity - this.velocity * this.velocity;
      if (numerator === 0) displacement = 0;else displacement = numerator / (2 * acceleration);
      var calc = this.y + displacement;
      this.curr_y = calc >= 0 ? calc : 0;
      this.velocity = final_velocity;
      this.last_time = time; // console.log(`Acceleration ${acceleration} y ${this.y} Displacement ${displacement}`)
    }
  }, {
    key: "addForce",
    value: function addForce(name, amt) {
      this.forces[name] = amt;
    }
  }, {
    key: "removeForce",
    value: function removeForce(name) {
      delete this.forces[name];
    }
  }, {
    key: "add_jump_force",
    value: function add_jump_force() {
      console.log("Jump force added");
      this.forces["jump"] = this.jump_force_value;
    }
  }, {
    key: "remove_jump_force",
    value: function remove_jump_force() {
      this.forces["jump"] = 0;
    }
  }, {
    key: "curr_y",
    set: function set(val) {
      if (val >= this.max_height) {
        this.y = this.max_height;
      } else if (val <= 0) {
        this.y = 0;
      } else {
        this.y = val;
      }
    }
  }]);

  return Chiri;
}();
/**
 *
 *
 *
 */


var GameView =
/*#__PURE__*/
function () {
  _createClass(GameView, [{
    key: "canavs_width",
    get: function get() {
      alert("get");
      this.updateDimensions();
      return Math.max(this.canvas_element.width, this.canvas_element.height);
    }
  }, {
    key: "canvas_height",
    get: function get() {
      this.updateDimensions();
      return Math.max(this.canvas_element.width, this.canvas_element.height);
    }
  }]);

  function GameView(canvas) {
    var _this2 = this;

    _classCallCheck(this, GameView);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "canvas_height", void 0);

    _defineProperty(this, "canavs_width", void 0);

    _defineProperty(this, "canvas_element", void 0);

    this.canvas_element = canvas;
    this.ctx = canvas.getContext('2d');
    this.updateDimensions();
    this.canavs_width = canvas.width;
    this.canvas_height = canvas.height;
    $(window).resize(function () {
      _this2.updateDimensions();
    });
  }

  _createClass(GameView, [{
    key: "updateDimensions",
    value: function updateDimensions() {
      // let size = Math.max(this.canvas_element.width, this.canvas_element.height);
      var size = Math.max($(this.canvas_element).width(), $(this.canvas_element).height());
      this.resizeCanvas(size); // $(this.canvas_element).width(size).height(size);
    }
  }, {
    key: "resizeCanvas",
    value: function resizeCanvas(size) {
      this.canvas_element.width = size;
      this.canvas_element.height = size;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.canavs_width, this.canvas_height);
    }
  }, {
    key: "display_start_screen",
    value: function display_start_screen() {
      var ctx = this.ctx;
      ctx.fillStyle = "Red";
      ctx.font = "30px Arial";
      ctx.fillText("Flapy Chirdi, Click to start", 10, 100);
    }
  }, {
    key: "display_over_screen",
    value: function display_over_screen() {
      var ctx = this.ctx;
      ctx.font = "30px Arial";
      ctx.fillText("Game Over, click to restart", 10, 100);
    }
  }]);

  return GameView;
}();

var Environment =
/*#__PURE__*/
function () {
  // game_view;
  function Environment(game) {
    _classCallCheck(this, Environment);

    _defineProperty(this, "pipe_distance", 2);

    _defineProperty(this, "window_width", 5);

    _defineProperty(this, "current_velocity", -1);

    _defineProperty(this, "pole_queue", []);

    _defineProperty(this, "last_time", 0);

    _defineProperty(this, "x_padding", 0.2);

    _defineProperty(this, "deletion_area_left", void 0);

    _defineProperty(this, "deletion_area_right", void 0);

    _defineProperty(this, "window_height", 6);

    _defineProperty(this, "game", void 0);

    this.game = game; // this.game_view = game_view;

    this.deletion_area_left = 0 - this.pipe_distance - this.x_padding;
    this.deletion_area_right = this.window_width + this.pipe_distance + this.x_padding;
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.reset();
  }

  _createClass(Environment, [{
    key: "reset",
    value: function reset() {
      // alert("Empty pole queue?");
      this.pole_queue = [];
      this.push_to_pole_queue();
      this.push_to_pole_queue();
      this.push_to_pole_queue();
      this.push_to_pole_queue();
      this.push_to_pole_queue();
    }
  }, {
    key: "push_to_pole_queue",
    value: function push_to_pole_queue() {
      var last_pos = this.pole_queue.length === 0 ? this.window_width + this.window_width + this.x_padding : this.pole_queue[this.pole_queue.length - 1].x;
      console.log("last_pos: ".concat(last_pos));
      this.pole_queue.push(new Pole(last_pos + this.pipe_distance, this));
    }
  }, {
    key: "pop_to_pole_queue",
    value: function pop_to_pole_queue() {
      this.pole_queue.shift();
    }
  }, {
    key: "update",
    value: function update(time) {
      var _this3 = this;

      var time_change = time - this.last_time;
      console.log("time_change ".concat(time_change));
      time_change = time_change / 1000;
      console.log("time_change ".concat(time_change));
      var displacement = this.current_velocity * time_change;
      console.log("Displacement: ".concat(displacement, " current_velocity: ").concat(this.current_velocity, " time_change: ").concat(time_change, " time: ").concat(time, " last_time: ").concat(this.last_time));
      this.pole_queue.forEach(function (pole) {
        pole.x += displacement;

        if (_this3.in_deletion_area(pole.x)) {
          _this3.push_to_pole_queue();

          _this3.pop_to_pole_queue();
        } // if(this.pole_queue.length === 0) {
        //     alert("adfa");
        //     this.push_to_pole_queue();
        // }

      });
      this.last_time = time;
    }
  }, {
    key: "in_deletion_area",
    value: function in_deletion_area(x) {
      return x < this.deletion_area_left;
    }
  }, {
    key: "draw",
    value: function draw() {
      console.log("Draw environment @ ".concat(this.pole_queue.length));
      this.pole_queue.forEach(function (pole) {
        pole.draw();
      });
    }
  }]);

  return Environment;
}();

var Pole =
/*#__PURE__*/
function () {
  function Pole(x, env) {
    _classCallCheck(this, Pole);

    _defineProperty(this, "pole_gap", 2);

    _defineProperty(this, "vertical_buffer", 0.1);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "env", void 0);

    _defineProperty(this, "pos_multiplier", void 0);

    _defineProperty(this, "start_gap", void 0);

    _defineProperty(this, "end_gap", void 0);

    _defineProperty(this, "pole_width", 0.5);

    this.x = x;
    this.env = env;
    this.pos_multiplier = this.env.game.game_view.canavs_width / this.env.window_width;
    var gap = this.get_random_range();
    this.start_gap = gap.start;
    this.end_gap = gap.end;
  }

  _createClass(Pole, [{
    key: "get_random_range",
    value: function get_random_range() {
      function randomInRange(min, max) {
        return Math.random() < 0.5 ? (1 - Math.random()) * (max - min) + min : Math.random() * (max - min) + min;
      }

      var rand = randomInRange(this.vertical_buffer, this.env.window_height - this.pole_gap - this.vertical_buffer);
      console.error("RAND" + rand);
      console.error("RANDOM"); // rand = 2

      return {
        start: rand,
        end: rand + this.pole_gap
      };
    }
  }, {
    key: "draw",
    value: function draw() {
      var ctx = this.env.game.game_view.ctx; // console.error(`Draw pole @ x ${this.x} with multiplier ${this.pos_multiplier}`)

      ctx.fillStyle = "green";
      var x0 = this.x * this.pos_multiplier - this.pole_width;
      console.log(x0);
      var x1 = this.to_physical_width(this.pole_width);
      console.log(x1);
      var length_up = this.env.game.game_view.canvas_height - this.to_physical_height(this.end_gap);
      var length_down = this.to_physical_height(this.start_gap); // let y0 = this.env.game_view.canavs_width - this.to_physical_height(this.end_gap);÷

      var y0 = 0;
      var y1 = length_up;
      console.log(y0);
      console.log("Pole x: ".concat(this.x));
      console.log("pos mul: ".concat(this.pos_multiplier)); // let y1 = this.env.game_view.canvas_height;

      console.log("".concat(y1, " and end_gap ").concat(this.to_physical_width(this.end_gap), " winht ").concat(JSON.stringify(this.env.game.game_view.canvas_height)));
      console.log("x0: ".concat(x0, " y0: ").concat(y0, " x0: ").concat(x1, " y1: ").concat(y1, " "));
      ctx.fillRect(x0, y0, x1, y1); // y0 = this.env.game_view.canavs_width;

      y0 = this.env.game.game_view.canavs_width - this.to_physical_height(this.start_gap); //  = this.to_physical_height(this.pole_width);

      y1 = length_down;
      ctx.fillRect(x0, y0, x1, y1);
      console.log("x0: ".concat(x0, " y0: ").concat(y0, " x0: ").concat(x1, " y1: ").concat(y1, " ")); // let x0 = this.x * this.pos_multiplier;
      // let y0 = this.env.game_view.canvas_height - 200;
      // let x1 =  20;
      // let y1 = 200;
      // ctx.fillRect(x0, y0, x1, y1);
      // x0 = this.x * this.pos_multiplier;
      // y0 = 0;
      // x1 = 20;
      // y1 = 200;
      // ctx.fillRect(x0, y0, x1, y1);
    }
  }, {
    key: "to_physical_height",
    value: function to_physical_height(virtual_ht) {
      return virtual_ht * (this.env.game.game_view.canvas_height / this.env.window_height); // return virtual_ht * this.pos_multiplier;
    }
  }, {
    key: "to_physical_width",
    value: function to_physical_width(virtual_wt) {
      return virtual_wt * (this.env.game.game_view.canavs_width / this.env.window_width); // return virtual_wt * this.pos_multiplier;
    }
  }]);

  return Pole;
}();

var GameController =
/*#__PURE__*/
function () {
  function GameController(game) {
    var _this4 = this;

    _classCallCheck(this, GameController);

    _defineProperty(this, "game", void 0);

    this.game = game;
    $(this.game.game_view.canvas_element).on("mousedown", function () {
      _this4.mousedown_handler();
    });
    $(this.game.game_view.canvas_element).on("mouseup", function () {
      _this4.mouseup_handler();
    });
    $(this.game.game_view.canvas_element).on("touchstart", function () {
      _this4.mousedown_handler();
    });
    $(this.game.game_view.canvas_element).on("touchend", function () {
      _this4.mouseup_handler();
    });
    $(this.game.game_view.canvas_element).on("click", function () {
      _this4.click_handler();
    });
  }

  _createClass(GameController, [{
    key: "mousedown_handler",
    value: function mousedown_handler() {
      switch (this.game.STATE) {
        case this.game.STATES.RUNNING:
          {
            console.log("adding jump force");
            this.game.bird.add_jump_force();
            break;
          }

        case this.game.STATES.STOPPED:
          {
            break;
          }

        case this.game.STATES.NEW:
          {
            break;
          }

        case this.game.STATES.PAUSED:
          {
            break;
          }
      }
    }
  }, {
    key: "click_handler",
    value: function click_handler() {
      // alert("Click");
      // alert(`State: ${this.game.STATE}`);
      switch (this.game.STATE) {
        case this.game.STATES.RUNNING:
          {
            break;
          }

        case this.game.STATES.STOPPED:
          {
            // alert("Start from new");                
            this.game.start();
            break;
          }

        case this.game.STATES.NEW:
          {
            // alert("Start from new");
            this.game.start();
            break;
          }

        case this.game.STATES.PAUSED:
          {
            break;
          }
      }
    }
  }, {
    key: "mouseup_handler",
    value: function mouseup_handler() {
      switch (this.game.STATE) {
        case this.game.STATES.RUNNING:
          {
            this.game.bird.remove_jump_force();
            break;
          }

        case this.game.STATES.STOPPED:
          {
            break;
          }

        case this.game.STATES.NEW:
          {
            break;
          }

        case this.game.STATES.PAUSED:
          {
            break;
          }
      }
    }
  }]);

  return GameController;
}();
/**
 * Starts the main loop for the game with given Flappy Chiri and GameView
 */


var Game =
/*#__PURE__*/
function () {
  function Game(game_view) {
    _classCallCheck(this, Game);

    _defineProperty(this, "progress", void 0);

    _defineProperty(this, "lastRender", void 0);

    _defineProperty(this, "bird", void 0);

    _defineProperty(this, "game_view", void 0);

    _defineProperty(this, "controller", void 0);

    _defineProperty(this, "game_env", void 0);

    _defineProperty(this, "game_start_timestamp", 0);

    _defineProperty(this, "STATES", {
      STOPPED: 0,
      // game over, start new game
      PAUSED: 1,
      // game paused
      RUNNING: 2,
      // in play mode.
      NEW: 3 // just loaded on page. display start game screen.

    });

    _defineProperty(this, "STATE", null);

    _defineProperty(this, "last_collision", false);

    _defineProperty(this, "kill_immunity", true);

    _defineProperty(this, "start_grace_period", 2000);

    this.game_view = game_view;
    this.initialize();
  }
  /**
   * Resets everything and starts the game again
   */


  _createClass(Game, [{
    key: "start",
    value: function start() {
      // alert("Game started");
      // console.log("Game started");
      // lazy reset, just create them over again.
      // js has to have a garbage collector right?
      this.game_start_timestamp = this.lastRender;
      this.STATE = this.STATES.RUNNING;
      this.progress = 0;
      this.last_collision = false; // delete this.bird;

      this.bird.reset(); // this.bird = new Chiri();
      // this.controller = new GameController(this);

      this.game_env.reset(); // delete this.game_env;
      // this.game_env = new Environment(game);

      this.kill_immunity = true;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.STATE = this.STATES.NEW;
      this.last_collision = false;
      this.bird = new Chiri();
      this.controller = new GameController(this);
      this.lastRender = 0;
      window.requestAnimationFrame(this.game_loop.bind(this));
      this.game_env = new Environment(this);
    }
  }, {
    key: "update",
    value: function update() {
      var _this5 = this;

      if (this.STATE === this.STATES.RUNNING && -this.game_start_timestamp + this.lastRender > this.start_grace_period) {
        this.kill_immunity = false;
      } else {
        this.kill_immunity = true;
      } // let collision = false;


      this.game_env.pole_queue.forEach(function (pole) {
        if (_this5.check_collission(pole, _this5.bird)) {
          // console.error("collision");
          if (!_this5.last_collision) {
            _this5.last_collision = !_this5.kill_immunity;
          }
        }
      });

      if (this.last_collision) {
        this.STATE = this.STATES.STOPPED;
      }

      switch (this.STATE) {
        case this.STATES.STOPPED:
          {
            break;
          }
          ;

        case this.STATES.PAUSED:
          {
            break;
          }
          ;

        case this.STATES.RUNNING:
          {
            console.error("Update working");
            this.bird.update(this.lastRender);
            this.game_env.update(this.lastRender);
            break;
          }
          ;

        case this.STATES.NEW:
          {
            this.game_env.update(this.lastRender);
            break;
          }
          ;

        default:
          {}
          ;
      }
    }
  }, {
    key: "displayText",
    value: function displayText(text) {
      var ctx = this.game_view.ctx;
      ctx.font = "12px Arial";
      ctx.fillText(text, 10, 50);
    }
  }, {
    key: "render",
    value: function render() {
      this.game_view.clear();
      this.game_env.draw();

      switch (this.STATE) {
        case this.STATES.STOPPED:
          {
            this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20); // console.error("stopped");

            this.game_view.display_over_screen();
            break;
          }
          ;

        case this.STATES.PAUSED:
          {
            this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
            break;
          }
          ;

        case this.STATES.RUNNING:
          {
            this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
            break;
          }
          ;

        case this.STATES.NEW:
          {
            this.game_view.display_start_screen();
            break;
          }
          ;

        default:
          {}
          ;
      }
    }
  }, {
    key: "check_collission",
    value: function check_collission(pole, chiri) {
      var px = pole.x;
      var brd = pole.env.window_width / 2;
      var bwt = chiri.size;
      if (chiri.y - bwt / 2 <= 0) return true;

      if (brd + bwt / 2 >= px && brd - bwt / 2 <= px + pole.pole_width) {
        // horizontal condition met
        // alert("Possible collision");
        if (chiri.y - bwt / 2 <= pole.start_gap || chiri.y + bwt / 2 >= pole.end_gap) {
          //vertical condition met
          return true;
        }
      }

      return false;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.render();
      this.update();
    }
  }, {
    key: "game_loop",
    value: function game_loop(timestamp) {
      console.log("State: ".concat(this.STATE));
      this.progress = timestamp - this.lastRender; // console.log(this.lastRender);

      this.draw();
      this.lastRender = timestamp; // this.displayText(`State: ${this.STATE} Immunity: ${this.kill_immunity} LastRender: ${this.lastRender} \nProgress: ${this.progress}`);

      window.requestAnimationFrame(this.game_loop.bind(this));
    }
  }]);

  return Game;
}();

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} // find flappy c and replace div with flappy


$(".flappyc").map(function () {
  return this;
}).get().forEach(function (aParentDiv) {
  if (!aParentDiv.classList.contains("drawn")) {
    var game_view = new GameView(aParentDiv);
    new Game(game_view);
  }
}); // function resizeCanvas(canvas, parentCard) {
//     console.log("resize canvas flappy called");
//     CANVAS_HEIGHT = $(parentCard).css('width');
//     CANVAS_WIDTH = $(parentCard).css('width');
//     CANVAS_WIDTH = CANVAS_WIDTH.substr(0, CANVAS_WIDTH.length - 2);
//     CANVAS_HEIGHT = CANVAS_HEIGHT.substr(0, CANVAS_HEIGHT.length - 2);
//     CANVAS_WIDTH = Math.max(CANVAS_HEIGHT, CANVAS_WIDTH);
//     CANVAS_HEIGHT = Math.max(CANVAS_HEIGHT, CANVAS_WIDTH);
//     canvas.width = CANVAS_WIDTH;
//     canvas.height = CANVAS_HEIGHT;
//     canvas.clientWidth = CANVAS_WIDTH;
//     canvas.clientHeight = CANVAS_HEIGHT;
//     $(canvas).css('height', CANVAS_HEIGHT);
//     $(canvas).css('width', CANVAS_WIDTH);
//     console.log(CANVAS_HEIGHT + " X " + CANVAS_WIDTH);
//     return {
//         width: CANVAS_WIDTH,
//         height: CANVAS_HEIGHT
//     }
// }