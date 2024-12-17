import GameElement from "./GameElement.js";

class Player extends GameElement {

    #width;
    #height;
    #score;

    constructor(x, y, width, height ,color, score) {
        super(x, y ,color);

        this.#width = width;
        this.#height = height;
        this.#score = score;
    }

    set width(width) {
        this.#width = width;
    }

    set height(height) {
        this.#height = height;
    }

    set score(score) {
        this.#score = score;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get score() {
        return this.#score;
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    drawScore(context, x, y){
        context.font = "48px serif";
        context.fillStyle = "white";
        context.fillText(this.score, x, y);
    }

    move(cursorPosY, screenHeight) {
        // Check if the cursor's Y position is out of bounds
        if (cursorPosY < 0) {
            this.y = 0;  // Set to the topmost position if the cursor is above
        } else if (cursorPosY > screenHeight - 100) {
            this.y = screenHeight - 100;  // Set to the bottommost position if the cursor is too low
        } else {
            this.y = cursorPosY;  // Otherwise, set to the cursor's Y position
        }
    }
    
}

export default Player;