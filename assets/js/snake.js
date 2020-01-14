

// function loop(callback) {
//   function callback_loop(t = 0) {
//     if (t > 0) callback(t);
//     window.requestAnimationFrame(callback_loop);
//   }
//   callback_loop();
// }

// $(window).on("load", function () {

//   var snake = null;

//   var header = $("#interactive-header");
//   function restart() {
//     let width = header.innerWidth();
//     let height = header.innerHeight();

//     width -= width % Snake.res;
//     height -= height % Snake.res;

//     if (snake !== null) {
//       if (snake.width == width && snake.height == header) return;
//       snake.destroy();
//     }
//     snake = new Snake(width, height);
//   }

//   $(window).resize(restart);
//   restart();

//   loop(function (time) {
//     snake.update(time);
//     header.css("background-image", `url("${snake.canvas.toDataURL("image/png")}")`);
//   });

// });


function rand_int(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {

    static get res() {
        return 40;
    }
    static get border() {
        return 5;
    }

    constructor(width, height) {
        console.log(`New Snake Game: ${width} x ${height}`);

        this.uuid = uuidv4();

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        this.width = width;
        this.height = height;

        this.grid_width = width / Snake.res;
        this.grid_height = height / Snake.res;

        this.food = this.random_point();
        this.t0 = 0;

        this.direction = new Point(1, 0);

        this.mouse = new Point(0, 0);

        $(document).on(`mousemove.snake${this.uuid}`, function (event) {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });
    }

    destroy() {
        $(document).off(`snake${this.uuid}`);
    }


    random_point() {
        return new Point(
            rand_int(0, this.grid_width - 1),
            rand_int(0, this.grid_height - 1)
        );
    }

    draw_cell(x, y, color) {
        this.ctx.fillStyle = color;
        x *= Snake.res;
        y *= Snake.res;
        let size = Snake.res - 2 * Snake.border;
        this.ctx.fillRect(
            x + Snake.border,
            y + Snake.border,
            size,
            size
        );
    }

    update(time) {
        let dt = time - this.t0;
        if (dt < 500) return;
        this.t0 = time;


        let choice = Math.random();
        if (choice <= 0.1) {
            this.direction.x = 1;
            this.direction.y = 0;
        } else if (choice <= 0.2) {
            this.direction.x = -1;
            this.direction.y = 0;
        } else if (choice <= 0.3) {
            this.direction.x = 0;
            this.direction.y = 1;
        } else if (choice <= 0.4) {
            this.direction.x = 0;
            this.direction.y = -1;
        }
        console.log(this.direction);

        this.food.x += this.direction.x;
        this.food.y += this.direction.y;
        if (this.food.x < 0) this.food.x = this.grid_width - 1;
        if (this.food.x >= this.grid_width) this.food.x = 0;
        if (this.food.y < 0) this.food.y = this.grid_height - 1;
        if (this.food.y >= this.grid_height) this.food.y = 0;

        this.ctx.fillStyle = "#eee";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.draw_cell(this.food.x, this.food.y, "#0a0");

    }
}