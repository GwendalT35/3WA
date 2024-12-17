class Shape {
    #color;

    constructor(color) {
        this.#color = color;
    }

    set color(color) {
        this.#color = color; 
    }

    get color() {
        return this.#color; 
    }
}

export default Shape;
