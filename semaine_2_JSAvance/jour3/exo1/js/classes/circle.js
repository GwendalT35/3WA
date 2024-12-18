import Shape from "./shape.js"

class Circle extends Shape{
    #x;
    #y;
    #r;

    constructor([x, y, r], color) {
        super(color)

        this.#x = x;
        this.#y = y;
        this.#r = r;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }

    set r(r) {
        this.#r = r;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get r(){
        return this.#r;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Circle;