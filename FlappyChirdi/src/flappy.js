function to_pixel(val_m, metre_total, pixel_total) {
    return val_m * (pixel_total / metre_total);
}

/**
 * Chiri the Bird
 * Flappy the Chiri Bird
 */
class Chiri {
    max_height = 6;
    y = 8; // metres from ground level
    gravity = -9.8; // m/s
    velocity = 0; // dydt
    last_time = 0;
    mass = 10; // kg
    jump_force_value = 1000; // Newton
    size = 0.20;
    forces = {
        gravity: this.mass * this.gravity,
    };

    constructor() {

    }

    reset() {
        this.y = 8;
        this.removeForce();
        this.velocity = 0;
        // this.last_time = 0;
    }

    getForce() {
        let total_force = 0;
        Object.keys(this.forces).forEach((key, index) => {
            total_force += this.forces[key];
        });
        console.log("Force: " + total_force);
        return total_force;
    }

    draw(canvas_height, canavs_width, ctx, size) {
        // console.log("ok");

        /*
        max_height * x = canvas_height;
        x = canvas_height / max_height

        virtual_ht * x = real_ht
        */

        size = to_pixel(this.size, this.max_height, canvas_height);
        ctx.fillStyle = "red";
        let x0 = canavs_width / 2 - size / 2;
        let y0 = canvas_height - (canvas_height / this.max_height) * this.y - size / 2;

        let x1 = size;
        let y1 = size / 2 + size / 2;

        // console.log(x0, y0, x1, y1);
        ctx.fillRect(x0, y0, x1, y1);
    }

    update(time) {
        if (this.y === 0) this.addForce("R", Math.max(0, this.getForce()))
        else if (this.y === this.max_height) this.addForce("R", Math.min(0, this.getForce()));
        else this.addForce("R", 0);
        let time_change = (time - this.last_time) / 1000;
        // time = time / 1000
        let acceleration = this.getForce() / this.mass;
        // calculate final velocity
        let final_velocity = this.velocity + acceleration * time_change;
        // update position
        // v^2 - u^2 = 2as
        let displacement;
        let numerator = (final_velocity * final_velocity - this.velocity * this.velocity);
        if (numerator === 0) displacement = 0;
        else displacement = numerator / (2 * acceleration);
        let calc = this.y + displacement;
        this.curr_y = calc >= 0 ? calc : 0;
        this.velocity = final_velocity;
        this.last_time = time;

        // console.log(`Acceleration ${acceleration} y ${this.y} Displacement ${displacement}`)
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
        console.log("Jump force added");
        this.forces["jump"] = this.jump_force_value;
    }

    remove_jump_force() {
        this.forces["jump"] = 0;
    }

}

/**
 *
 *
 *
 */
class GameView {
    ctx;
    canvas_height;
    canavs_width;
    canvas_element;

    get canavs_width() {
        alert("get");
        this.updateDimensions();
        return Math.max(this.canvas_element.width, this.canvas_element.height);
    }

    get canvas_height() {
        this.updateDimensions();
        return Math.max(this.canvas_element.width, this.canvas_element.height);

    }

    constructor(canvas) {
        this.canvas_element = canvas;
        this.ctx = canvas.getContext('2d');
        this.updateDimensions();
        this.canavs_width = canvas.width;
        this.canvas_height = canvas.height;
        $(window).resize(() => {
            this.updateDimensions();
        });
    }

    updateDimensions() {
        // let size = Math.max(this.canvas_element.width, this.canvas_element.height);
        let size = Math.max(
            $(this.canvas_element).width(),
            $(this.canvas_element).height()
        );
        this.resizeCanvas(size);
        // $(this.canvas_element).width(size).height(size);
    }


    resizeCanvas(size) {
        this.canvas_element.width = size;
        this.canvas_element.height = size;
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canavs_width, this.canvas_height);
    }


    display_start_screen() {
        let ctx = this.ctx;
        ctx.fillStyle = "Red";
        ctx.font = "30px Arial";
        ctx.fillText("Flapy Chirdi, Click to start", 10, 100);
    }

    display_over_screen() {
        let ctx = this.ctx;
        ctx.font = "30px Arial";
        ctx.fillText("Game Over, click to restart", 10, 100);
    }
}

class Environment {
    pipe_distance = 2;
    window_width = 5;
    current_velocity = -1;
    pole_queue = [];
    last_time = 0;
    x_padding = 0.2;
    deletion_area_left;
    deletion_area_right;
    window_height = 6;
    // game_view;
    game;

    constructor(game) {
        this.game = game;
        // this.game_view = game_view;
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
        // alert("Empty pole queue?");
        this.pole_queue = [];
        this.push_to_pole_queue();
        this.push_to_pole_queue();
        this.push_to_pole_queue();
        this.push_to_pole_queue();
        this.push_to_pole_queue();
    }

    push_to_pole_queue() {
        let last_pos = this.pole_queue.length === 0 ?
            this.window_width + this.window_width + this.x_padding :
            this.pole_queue[this.pole_queue.length - 1].x;
        console.log(`last_pos: ${last_pos}`);
        this.pole_queue.push(new Pole(last_pos + this.pipe_distance, this));
    }

    pop_to_pole_queue() {
        this.pole_queue.shift();
    }

    update(time) {
        let time_change = time - this.last_time;
        console.log(`time_change ${time_change}`)
        time_change = time_change / 1000;
        console.log(`time_change ${time_change}`)
        let displacement = this.current_velocity * time_change;
        console.log(`Displacement: ${displacement} current_velocity: ${this.current_velocity} time_change: ${time_change} time: ${time} last_time: ${this.last_time}`);
        this.pole_queue.forEach((pole) => {
            pole.x += displacement;
            if (this.in_deletion_area(pole.x)) {
                this.push_to_pole_queue();
                this.pop_to_pole_queue();
            }
            // if(this.pole_queue.length === 0) {
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
        console.log(`Draw environment @ ${this.pole_queue.length}`)
        this.pole_queue.forEach((pole) => {
            pole.draw();
        });
    }
}

class Pole {
    pole_gap = 2;
    vertical_buffer = 0.1;
    x;
    env;
    pos_multiplier;
    start_gap;
    end_gap;
    pole_width = 0.5;

    constructor(x, env) {
        this.x = x;
        this.env = env;
        this.pos_multiplier = (this.env.game.game_view.canavs_width / this.env.window_width);
        let gap = this.get_random_range();
        this.start_gap = gap.start;
        this.end_gap = gap.end;
    }

    get_random_range() {
        function randomInRange(min, max) {
            return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
        }

        let rand = randomInRange(this.vertical_buffer, this.env.window_height - this.pole_gap - this.vertical_buffer);
        console.error("RAND" + rand);

        console.error("RANDOM");
        // rand = 2
        return {
            start: rand, end: rand + this.pole_gap
        }
    }

    draw() {
        let ctx = this.env.game.game_view.ctx;
        // console.error(`Draw pole @ x ${this.x} with multiplier ${this.pos_multiplier}`)
        ctx.fillStyle = "green";
        let x0 = this.x * this.pos_multiplier - this.pole_width;
        console.log(x0);
        let x1 = this.to_physical_width(this.pole_width);
        console.log(x1);

        let length_up = this.env.game.game_view.canvas_height - this.to_physical_height(this.end_gap);
        let length_down = this.to_physical_height(this.start_gap);

        // let y0 = this.env.game_view.canavs_width - this.to_physical_height(this.end_gap);÷
        let y0 = 0;
        let y1 = length_up;
        console.log(y0);
        console.log(`Pole x: ${this.x}`);
        console.log(`pos mul: ${this.pos_multiplier}`);
        // let y1 = this.env.game_view.canvas_height;
        console.log(`${y1} and end_gap ${this.to_physical_width(this.end_gap)} winht ${JSON.stringify(this.env.game.game_view.canvas_height)}`);
        console.log(`x0: ${x0} y0: ${y0} x0: ${x1} y1: ${y1} `);

        ctx.fillRect(x0, y0, x1, y1);
        // y0 = this.env.game_view.canavs_width;
        y0 = this.env.game.game_view.canavs_width - this.to_physical_height(this.start_gap);
        //  = this.to_physical_height(this.pole_width);
        y1 = length_down;
        ctx.fillRect(x0, y0, x1, y1);

        console.log(`x0: ${x0} y0: ${y0} x0: ${x1} y1: ${y1} `);
        // let x0 = this.x * this.pos_multiplier;
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

    to_physical_height(virtual_ht) {
        return virtual_ht * (this.env.game.game_view.canvas_height / this.env.window_height);
        // return virtual_ht * this.pos_multiplier;
    }

    to_physical_width(virtual_wt) {
        return virtual_wt * (this.env.game.game_view.canavs_width / this.env.window_width);
        // return virtual_wt * this.pos_multiplier;
    }
}

class GameController {
    game;
    constructor(game) {
        this.game = game;
        $(this.game.game_view.canvas_element).on("mousedown",
            () => {
                this.mousedown_handler()
            }
        );
        $(this.game.game_view.canvas_element).on("mouseup",
            () => {
                this.mouseup_handler()
            }
        );
        $(this.game.game_view.canvas_element).on("touchstart",
            () => {
                this.mousedown_handler()
            }
        );
        $(this.game.game_view.canvas_element).on("touchend",
            () => {
                this.mouseup_handler()
            }
        )
        $(this.game.game_view.canvas_element).on("click",
            () => {
                this.click_handler()
            })
    }

    mousedown_handler() {
        switch (this.game.STATE) {
            case this.game.STATES.RUNNING: {
                console.log("adding jump force");
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
        // alert("Click");
        // alert(`State: ${this.game.STATE}`);
        switch (this.game.STATE) {
            case this.game.STATES.RUNNING: {
                break;
            }
            case this.game.STATES.STOPPED: {
                // alert("Start from new");                
                this.game.start();
                break;
            }
            case this.game.STATES.NEW: {
                // alert("Start from new");
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
    progress;
    lastRender;
    bird;
    game_view;
    controller;
    game_env;
    game_start_timestamp = 0;
    STATES = {
        STOPPED: 0, // game over, start new game
        PAUSED: 1, // game paused
        RUNNING: 2, // in play mode.
        NEW: 3, // just loaded on page. display start game screen.
    };
    STATE = null;
    last_collision = false;
    kill_immunity = true;
    start_grace_period = 2000;

    constructor(game_view) {
        this.game_view = game_view;
        this.initialize();
    }

    /**
     * Resets everything and starts the game again
     */
    start() {
        // alert("Game started");
        // console.log("Game started");
        // lazy reset, just create them over again.
        // js has to have a garbage collector right?
        this.game_start_timestamp = this.lastRender;
        this.STATE = this.STATES.RUNNING;
        this.progress = 0;
        this.last_collision = false;
        // delete this.bird;
        this.bird.reset();
        // this.bird = new Chiri();
        // this.controller = new GameController(this);
        this.game_env.reset();
        // delete this.game_env;
        // this.game_env = new Environment(game);
        this.kill_immunity = true;
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
        if (this.STATE === this.STATES.RUNNING && (- this.game_start_timestamp + this.lastRender > this.start_grace_period)) {
            this.kill_immunity = false;
        }
        else {
            this.kill_immunity = true;
        }

        // let collision = false;
        this.game_env.pole_queue.forEach((pole) => {
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
            };
            case this.STATES.PAUSED: {
                break;
            };
            case this.STATES.RUNNING: {
                console.error("Update working");
                this.bird.update(this.lastRender);
                this.game_env.update(this.lastRender);
                break;
            };
            case this.STATES.NEW: {
                this.game_env.update(this.lastRender);
                break;
            };
            default: {

            };
        }

    }

    displayText(text) {
        let ctx = this.game_view.ctx;
        ctx.font = "12px Arial";
        ctx.fillText(text, 10, 50);
    }

    render() {
        this.game_view.clear();
        this.game_env.draw();
        switch (this.STATE) {
            case this.STATES.STOPPED: {
                this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
                // console.error("stopped");
                this.game_view.display_over_screen();
                break;
            };
            case this.STATES.PAUSED: {
                this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);

                break;

            };
            case this.STATES.RUNNING: {
                this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);

                break;
            };
            case this.STATES.NEW: {
                this.game_view.display_start_screen();
                break;
            };
            default: {

            };
        }
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
        console.log(`State: ${this.STATE}`);
        this.progress = timestamp - this.lastRender;
        // console.log(this.lastRender);
        this.draw();
        this.lastRender = timestamp;
        // this.displayText(`State: ${this.STATE} Immunity: ${this.kill_immunity} LastRender: ${this.lastRender} \nProgress: ${this.progress}`);
        window.requestAnimationFrame(this.game_loop.bind(this));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// find flappy c and replace div with flappy

$(".flappyc")
    .map(function () {
        return this;
    })
    .get()
    .forEach((aParentDiv) => {
        if (!aParentDiv.classList.contains("drawn")) {

            let game_view = new GameView(aParentDiv);
            new Game(game_view);

        }
    })

// function resizeCanvas(canvas, parentCard) {
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