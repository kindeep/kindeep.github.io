function to_pixel(val_m ,metre_total, pixel_total) {
    return val_m * (pixel_total /  metre_total);
}

/**
 * Chiri the Bird
 * Flappy the Chiri Bird
 */
class Chiri {
    max_height = 6;
    y = 4; // metres from ground level
    gravity = - 9.8; // m/s
    velocity = 0; // dydt
    last_time = 0;
    mass = 10; // kg
    jump_force_value = 550; // Newton
    size = 0.20;
    forces = {
        gravity: this.mass * this.gravity,
    };
    constructor() {

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
        }
        else {
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
    constructor(canvas) {
        this.canvas_element = canvas;
        this.ctx = canvas.getContext('2d');
        this.canavs_width = canvas.width;
        this.canvas_height = canvas.height;
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canavs_width, this.canvas_height);
    }
}

class Environment {
    pipe_distance = 2;
    window_width = 5;
    current_velocity = - 1;
    pole_queue = [];
    last_time = 0;
    x_padding = 0.2;
    deletion_area_left;
    deletion_area_right;
    window_height = 6;
    game_view;

    constructor(game_view) {
        this.game_view = game_view;
        this.deletion_area_left = 0 - this.pipe_distance - this.x_padding;
        this.deletion_area_right = this.window_width + this.pipe_distance + this.x_padding;
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
        this.pos_multiplier = (this.env.game_view.canavs_width / this.env.window_width);
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
        let ctx = this.env.game_view.ctx;
        // console.error(`Draw pole @ x ${this.x} with multiplier ${this.pos_multiplier}`)
        ctx.fillStyle = "green";
        let x0 = this.x * this.pos_multiplier - this.pole_width;
        console.log(x0);
        let x1 = this.to_physical_width(this.pole_width);
        console.log(x1);

        let length_up = this.env.game_view.canvas_height - this.to_physical_height(this.end_gap);
        let length_down = this.to_physical_height(this.start_gap);

        // let y0 = this.env.game_view.canavs_width - this.to_physical_height(this.end_gap);÷
        let y0 = 0;
        let y1 = length_up;
        console.log(y0);
        // let y1 = this.env.game_view.canvas_height;
        console.log(`${y1} and end_gap ${this.to_physical_width(this.end_gap)} winht ${JSON.stringify(this.env.game_view.canvas_height)}`);
        ctx.fillRect(x0, y0, x1, y1);
        // y0 = this.env.game_view.canavs_width;
        y0 = this.env.game_view.canavs_width - this.to_physical_height(this.start_gap);
        //  = this.to_physical_height(this.pole_width);
        y1 = length_down;
        ctx.fillRect(x0, y0, x1, y1);
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
        return virtual_ht * (this.env.game_view.canvas_height / this.env.window_height);
        // return virtual_ht * this.pos_multiplier;
    }

    to_physical_width(virtual_wt) {
        return virtual_wt * (this.env.game_view.canavs_width / this.env.window_width);
        // return virtual_wt * this.pos_multiplier;
    }
}

class GameController {
    canvas;
    bird;
    constructor(canvas, bird) {
        this.canvas = canvas;
        this.bird = bird;
        $(canvas).on("mousedown",
            () => { this.mousedown_handler() }
        )
        $(canvas).on("mouseup",
            () => { this.mouseup_handler() }
        )
    }

    mousedown_handler() {
        console.log("adding jump force");
        this.bird.add_jump_force();
    }

    mouseup_handler() {
        this.bird.remove_jump_force();
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

    last_collision = false;
    constructor(bird, game_view) {
        this.bird = bird;
        this.game_view = game_view;
        this.controller = new GameController(game_view.canvas_element, bird);
        this.lastRender = 0;
        window.requestAnimationFrame(this.game_loop.bind(this));
        this.game_env = new Environment(game_view);
    }

    update() {
        let collision = false;
        this.game_env.pole_queue.forEach((pole) => {
            if (this.check_collission(pole, this.bird)) {
                console.error("collision");
                // return;
                if (!this.last_collision) {
                    alert("collision");
                    this.last_collision = true;
                }
                collision = true;
            }
        })
        if (!this.last_collision) {
            this.bird.update(this.lastRender);
            this.game_env.update(this.lastRender);
        }
    }

    render() {
        this.game_view.clear();
        this.game_env.draw();
        this.bird.draw(this.game_view.canavs_width, this.game_view.canvas_height, this.game_view.ctx, 20);
    }

    check_collission(pole, chiri) {
        let px = pole.x;
        let brd = pole.env.window_width / 2;
        let bwt = chiri.size;
        if (brd + bwt/2 >= px && brd - bwt/2 <= px + pole.pole_width) {
            // horizontal condition met
            // alert("Possible collision");
            if (chiri.y - bwt/2 <= pole.start_gap || chiri.y + bwt/2 >= pole.end_gap) {
                //vertical condition met
                return true;
            }
        }
        return false;
    }

    game_loop(timestamp) {
        this.progress = timestamp - this.lastRender;
        // console.log(this.lastRender);
        this.render();
        this.update();
        this.lastRender = timestamp;
        window.requestAnimationFrame(this.game_loop.bind(this));
    }
}