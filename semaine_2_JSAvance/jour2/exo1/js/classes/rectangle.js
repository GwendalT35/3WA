import Shape from "./shape.js"

class Rectangle extends Shape {
    #x;
    #y;
    #width;
    #height;

    constructor(x, y, width, height, color) {
        super(color);

        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height; 
    }

    set x(x){
        this.#x = x;
    }

    set y(y){
        this.#y = y;
    }

    set width(width){
        this.#width = width;
    }

    set height(height){
        this.#height = height;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get width(){
        return this.#width;
    }

    get height(){
        return this.#height;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


export default Rectangle;