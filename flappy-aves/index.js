import $ from "jquery";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

function to_pixel(val_m, metre_total, pixel_total) {
  return val_m * (pixel_total / metre_total);
}
/**
 * Chiri the Bird
 * Flappy the Chiri Bird
 */

class Chiri {
  constructor() {
    _defineProperty(this, 'max_height', void 0);

    _defineProperty(this, 'y', void 0);

    _defineProperty(this, 'gravity', void 0);

    _defineProperty(this, 'velocity', void 0);

    _defineProperty(this, 'last_time', void 0);

    _defineProperty(this, 'mass', void 0);

    _defineProperty(this, 'jump_force_value', void 0);

    _defineProperty(this, 'size', void 0);

    _defineProperty(this, 'forces', void 0);

    _defineProperty(this, 'img', void 0);

    _defineProperty(this, 'imgLoaded', void 0);

    this.img = new Image();
    this.img.src = 'assets/flappy/bird.png';
    this.img.onload = () => {
      this.imgLoaded = true;
    };

    this.max_height = 6;
    this.y = 8; // metres from ground level

    this.gravity = -9.8; // m/s

    this.velocity = 0; // dydt

    this.last_time = 0;
    this.mass = 10; // kg

    this.jump_force_value = 1000; // Newton

    this.size = 0.4;
    this.forces = {
      gravity: this.mass * this.gravity,
    };
  }

  reset() {
    this.y = 8;
    this.removeForce();
    this.velocity = 0;
  }

  getForce() {
    let total_force = 0;
    Object.keys(this.forces).forEach((key, index) => {
      total_force += this.forces[key];
    });
    return total_force;
  }

  draw(canvas_height, canavs_width, ctx, size) {
    size = to_pixel(this.size, this.max_height, canvas_height);
    ctx.fillStyle = 'red';
    let x0 = canavs_width / 2 - size / 2;
    let y0 = canvas_height - (canvas_height / this.max_height) * this.y - size / 2;
    let x1 = size;
    let y1 = size / 2 + size / 2;

    ctx.drawImage(this.img, x0, y0, x1, y1);
  }

  update(time) {
    if (this.y === 0) this.addForce('R', Math.max(0, this.getForce()));
    else if (this.y === this.max_height) this.addForce('R', Math.min(0, this.getForce()));
    else this.addForce('R', 0);
    let time_change = (time - this.last_time) / 1000; // time = time / 1000

    let acceleration = this.getForce() / this.mass; // calculate final velocity

    let final_velocity = this.velocity + acceleration * time_change; // update position
    // v^2 - u^2 = 2as

    let displacement;
    let numerator = final_velocity * final_velocity - this.velocity * this.velocity;
    if (numerator === 0) displacement = 0;
    else displacement = numerator / (2 * acceleration);
    let calc = this.y + displacement;
    this.curr_y = calc >= 0 ? calc : 0;
    this.velocity = final_velocity;
    this.last_time = time;
  }

  set curr_y(val) {
    if (val >= this.max_height) {
      this.y = this.max_height;
    } else if (val <= 0) {
      this.y = 0;
    } else {
      this.y = val;
    }
  }

  addForce(name, amt) {
    this.forces[name] = amt;
  }

  removeForce(name) {
    delete this.forces[name];
  }

  add_jump_force() {
    this.forces['jump'] = this.jump_force_value;
  }

  remove_jump_force() {
    this.forces['jump'] = 0;
  }
}

class GameView {
  constructor(canvas) {
    _defineProperty(this, 'ctx', void 0);

    _defineProperty(this, 'canvas_height', void 0);

    _defineProperty(this, 'canavs_width', void 0);

    _defineProperty(this, 'canvas_element', void 0);

    _defineProperty(this, 'backgroundImage', void 0);

    _defineProperty(this, 'backgroundImageLoaded', void 0);

    this.startTextColor = '#1133ff';
    this.overTextColor = '#dd1122';
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'assets/flappy/background.png';
    this.backgroundImage.onload = () => {
      this.backgroundImageLoaded = true;
    };
    this.canvas_element = canvas;
    this.ctx = canvas.getContext('2d');
    this.updateDimensions();
    this.canavs_width = canvas.width;
    this.canvas_height = canvas.height;

    $(this.canvas_element).css('image-rendering', 'crisp-edges');
  }

  get canavs_width() {
    alert('get');
    this.updateDimensions();
    return Math.max(this.canvas_element.width, this.canvas_element.height);
  }

  get canvas_height() {
    this.updateDimensions();
    return Math.max(this.canvas_element.width, this.canvas_element.height);
  }

  updateDimensions() {
    // let size = Math.max(this.canvas_element.width, this.canvas_element.height);
    let size = Math.max($(this.canvas_element).width(), $(this.canvas_element).height());
    this.resizeCanvas(size); // $(this.canvas_element).width(size).height(size);
  }

  resizeCanvas(size) {
    this.canvas_element.width = size;
    this.canvas_element.height = size;
  }

  clear() {
    // this.ctx.fillStyle = "white";
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canavs_width, this.canvas_height);
  }

  display_start_screen() {
    let ctx = this.ctx;
    ctx.fillStyle = this.startTextColor;
    ctx.font = 'bold 30px Arial';
    ctx.fillText('CLICK TO START', 10, 100);
  }

  display_over_screen() {
    let ctx = this.ctx;
    ctx.fillStyle = this.overTextColor;
    ctx.font = 'bold 30px Arial';
    ctx.fillText('GAME OVER', 10, 100);
  }

  display_score(score) {
    let ctx = this.ctx;
    ctx.fillStyle = this.startTextColor;
    ctx.font = 'bold 30px Arial';
    ctx.fillText(score, 10, 70);
  }
}

class Environment {
  constructor(game) {
    this.numPoles = 0;
    this.pipe_distance = 2; // distance between pipes in meteres
    this.window_width = 5; // width of window in meteres
    this.current_velocity = -1; // current velocity in m/s
    this.pole_queue = [];
    this.last_time = 0;
    this.x_padding = 0.2;
    this.deletion_area_left;
    this.deletion_area_right;
    this.window_height = 6;
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

  reset() {
    this.numPoles = 0;
    this.pole_queue = [];
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
    this.push_to_pole_queue();
  }

  push_to_pole_queue() {
    let last_pos =
      this.pole_queue.length === 0
        ? this.window_width + this.window_width + this.x_padding
        : this.pole_queue[this.pole_queue.length - 1].x;
    this.pole_queue.push(new Pole(last_pos + this.pipe_distance, this, ++this.numPoles));
  }

  pop_to_pole_queue() {
    this.pole_queue.shift();
  }

  update(time) {
    let time_change = time - this.last_time;

    time_change = time_change / 1000;

    let displacement = this.current_velocity * time_change;

    this.pole_queue.forEach((pole) => {
      pole.x += displacement;

      if (this.in_deletion_area(pole.x)) {
        this.push_to_pole_queue();
        this.pop_to_pole_queue();
      } // if(this.pole_queue.length === 0) {
      //     alert("adfa");
      //     this.push_to_pole_queue();
      // }
    });
    this.last_time = time;
  }

  in_deletion_area(x) {
    return x < this.deletion_area_left;
  }

  draw() {
    this.pole_queue.forEach((pole) => {
      pole.draw();
    });
  }
}

class Pole {
  constructor(x, env, poleIndex) {
    this.poleIndex = poleIndex;
    // instance vars
    this.pole_gap = 2;
    this.vertical_buffer = 0.1;
    this.x;
    this.env;
    this.pos_multiplier;
    this.start_gap;
    this.end_gap;
    this.pole_width = 0.5; // eo instance vars
    this.poleImageAbove = new Image();
    this.poleImageBelow = new Image();
    this.poleImageAbove.src = 'assets/flappy/pipe-above.png';
    this.poleImageBelow.src = 'assets/flappy/pipe-below.png';
    this.poleImageAbove.onload = () => {
      this.poleImageAboveLoaded = true;
    };
    this.poleImageBelow.onload = () => {
      this.poleImageBelowLoaded = true;
    };
    this.x = x;
    this.env = env;
    this.pos_multiplier = this.env.game.game_view.canavs_width / this.env.window_width;
    let gap = this.get_random_range();
    this.start_gap = gap.start;
    this.end_gap = gap.end;
  }

  get_random_range() {
    function randomInRange(min, max) {
      return Math.random() < 0.5 ? (1 - Math.random()) * (max - min) + min : Math.random() * (max - min) + min;
    }

    let rand = randomInRange(this.vertical_buffer, this.env.window_height - this.pole_gap - this.vertical_buffer); // console.error("RAND" + rand);
    // console.error("RANDOM");
    // rand = 2

    return {
      start: rand,
      end: rand + this.pole_gap,
    };
  }

  draw() {
    let ctx = this.env.game.game_view.ctx;

    ctx.fillStyle = 'green';
    let x0 = this.x * this.pos_multiplier - this.pole_width;

    let x1 = this.to_physical_width(this.pole_width);

    let length_up = this.env.game.game_view.canvas_height - this.to_physical_height(this.end_gap);
    let length_down = this.to_physical_height(this.start_gap);

    let y0 = 0;
    let y1 = length_up;

    let aboveHeightPixels = this.poleImageBelow.width * (y1 / x1);
    ctx.drawImage(
      this.poleImageAbove,
      0,
      y0 + this.poleImageAbove.height - aboveHeightPixels,
      this.poleImageAbove.width,
      aboveHeightPixels,
      x0,
      y0,
      x1,
      y1
    );

    y0 = this.env.game.game_view.canavs_width - this.to_physical_height(this.start_gap);

    y1 = length_down;
    ctx.drawImage(
      this.poleImageBelow,
      0,
      0,
      this.poleImageBelow.width,
      this.poleImageBelow.width * (y1 / x1),
      x0,
      y0,
      x1,
      y1
    );
  }

  to_physical_height(virtual_ht) {
    return virtual_ht * (this.env.game.game_view.canvas_height / this.env.window_height);
  }

  to_physical_width(virtual_wt) {
    return virtual_wt * (this.env.game.game_view.canavs_width / this.env.window_width);
  }
}

class GameController {
  constructor(game) {
    _defineProperty(this, 'game', void 0);

    this.game = game;
    $(this.game.game_view.canvas_element).on('mousedown', () => {
      this.mousedown_handler();
    });
    $(this.game.game_view.canvas_element).on('mouseup', () => {
      this.mouseup_handler();
    });
    $(window).on('keypress', (e) => {
      if (e.originalEvent.code === 'Space') {
        this.click_handler();
      }
    });
    $(window).on('keydown', (e) => {
      if (e.originalEvent.code === 'Space') {
        this.mousedown_handler();
      }
    });
    $(window).on('keyup', (e) => {
      if (e.originalEvent.code === 'Space') {
        this.mouseup_handler();
      }
    });
    $(this.game.game_view.canvas_element).on('touchstart', () => {
      this.mousedown_handler();
    });
    $(this.game.game_view.canvas_element).on('touchend', () => {
      this.mouseup_handler();
    });
    $(this.game.game_view.canvas_element).on('click', () => {
      this.click_handler();
    });
  }

  mousedown_handler() {
    switch (this.game.STATE) {
      case this.game.STATES.RUNNING: {
        this.game.bird.add_jump_force();
        break;
      }

      case this.game.STATES.STOPPED: {
        break;
      }

      case this.game.STATES.NEW: {
        break;
      }

      case this.game.STATES.PAUSED: {
        break;
      }
    }
  }

  click_handler() {
    switch (this.game.STATE) {
      case this.game.STATES.RUNNING: {
        break;
      }

      case this.game.STATES.STOPPED: {
        this.game.start();
        break;
      }

      case this.game.STATES.NEW: {
        this.game.start();
        break;
      }

      case this.game.STATES.PAUSED: {
        break;
      }
    }
  }

  mouseup_handler() {
    switch (this.game.STATE) {
      case this.game.STATES.RUNNING: {
        this.game.bird.remove_jump_force();
        break;
      }

      case this.game.STATES.STOPPED: {
        break;
      }

      case this.game.STATES.NEW: {
        break;
      }

      case this.game.STATES.PAUSED: {
        break;
      }
    }
  }
}

/**
 * Starts the main loop for the game with given Flappy Chiri and GameView
 */
class Game {
  constructor(game_view) {
    _defineProperty(this, 'progress', void 0);

    _defineProperty(this, 'lastRender', void 0);

    _defineProperty(this, 'bird', void 0);

    _defineProperty(this, 'game_view', void 0);

    _defineProperty(this, 'controller', void 0);

    _defineProperty(this, 'game_env', void 0);

    _defineProperty(this, 'game_start_timestamp', void 0);

    _defineProperty(this, 'STATES', void 0);

    _defineProperty(this, 'STATE', void 0);

    _defineProperty(this, 'last_collision', void 0);

    _defineProperty(this, 'kill_immunity', void 0);

    _defineProperty(this, 'start_grace_period', void 0);
    this.score = 0;

    // instance
    this.game_start_timestamp = 0;
    this.STATES = {
      STOPPED: 0,
      // game over, start new game
      PAUSED: 1,
      // game paused
      RUNNING: 2,
      // in play mode.
      NEW: 3, // just loaded on page. display start game screen.
    };
    this.STATE = null;
    this.last_collision = false;
    this.kill_immunity = true;
    this.start_grace_period = 2000; // eo instance

    this.game_view = game_view;
    this.initialize();
  }
  /**
   * Resets everything and starts the game again
   */

  start() {
    // lazy reset, just create them over again.
    // js has to have a garbage collector right?
    this.game_start_timestamp = this.lastRender;
    this.STATE = this.STATES.RUNNING;
    this.progress = 0;
    this.last_collision = false;
    this.bird.reset();
    this.game_env.reset();
    this.kill_immunity = true;
    this.score = 0;
  }

  initialize() {
    this.STATE = this.STATES.NEW;
    this.last_collision = false;
    this.bird = new Chiri();
    this.controller = new GameController(this);
    this.lastRender = 0;
    window.requestAnimationFrame(this.game_loop.bind(this));
    this.game_env = new Environment(this);
  }

  update() {
    if (this.STATE === this.STATES.RUNNING && -this.game_start_timestamp + this.lastRender > this.start_grace_period) {
      this.kill_immunity = false;
    } else {
      this.kill_immunity = true;
    } // let collision = false;

    this.game_env.pole_queue.forEach((pole) => {
      if (this.past_middle_point(pole)) {
        this.score = Math.max(this.score, pole.poleIndex);
      }
      if (this.check_collission(pole, this.bird)) {
        // console.error("collision");
        if (!this.last_collision) {
          this.last_collision = !this.kill_immunity;
        }
      }
    });

    if (this.last_collision) {
      this.STATE = this.STATES.STOPPED;
    }

    switch (this.STATE) {
      case this.STATES.STOPPED: {
        break;
      }

      case this.STATES.PAUSED: {
        break;
      }

      case this.STATES.RUNNING: {
        // console.error("Update working");
        this.bird.update(this.lastRender);
        this.game_env.update(this.lastRender);
        break;
      }

      case this.STATES.NEW: {
        this.game_env.update(this.lastRender);
        break;
      }

      default: {
      }
    }
  }

  displayText(text) {
    let ctx = this.game_view.ctx;
    ctx.font = '12px Arial';
    ctx.fillText(text, 10, 50);
  }

  render() {
    this.game_view.clear();
    this.game_env.draw();

    switch (this.STATE) {
      case this.STATES.STOPPED: {
        this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20); // console.error("stopped");

        this.game_view.display_over_screen();
        this.game_view.display_score(this.score);
        break;
      }

      case this.STATES.PAUSED: {
        this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
        this.game_view.display_score(this.score);
        break;
      }

      case this.STATES.RUNNING: {
        this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
        this.game_view.display_score(this.score);
        break;
      }

      case this.STATES.NEW: {
        this.game_view.display_start_screen();
        break;
      }

      default: {
      }
    }
  }

  past_middle_point(pole) {
    return pole.x < this.game_env.window_width / 2;
  }

  check_collission(pole, chiri) {
    let px = pole.x;
    let brd = pole.env.window_width / 2;
    let bwt = chiri.size;
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

  draw() {
    this.render();
    this.update();
  }

  game_loop(timestamp) {
    this.progress = timestamp - this.lastRender;

    this.draw();
    this.lastRender = timestamp;

    window.requestAnimationFrame(this.game_loop.bind(this));
  }
}

export default function startGame(canvas) {
  let game_view = new GameView(canvas);
  new Game(game_view);
}