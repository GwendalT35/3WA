import Rectangle from "./classes/rectangle.js";
import Circle from "./classes/circle.js";

const canvas = document.getElementById("canvas");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const rect = new Rectangle(10, 10, 100, 150, "red");
    const rect2 = new Rectangle(250, 250, 10, 200, "orange");

    const circle = new Circle(50, 50, 20, "blue");
    const circle2 = new Circle(250, 125, 40, "green");


    rect.draw(ctx);
    rect2.draw(ctx);
    circle.draw(ctx);
    circle2.draw(ctx);
}