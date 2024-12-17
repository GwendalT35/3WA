import Player from "./classes/Player.js";
import Ball from "./classes/Ball.js";


var cursor_x = 0;
var cursor_y = 0;

// Update the mouse position whenever it moves
document.onmousemove = function(event) {
    cursor_x = event.pageX;
    cursor_y = event.pageY;
};

function clearScreen(ctx, width, height){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}

const gameScreen = document.getElementById("canvas");
if (gameScreen.getContext) {
    const ctx = gameScreen.getContext("2d");
    const screenHeight = gameScreen.height;
    const screenWidth = gameScreen.width;
    
    let player1 = new Player(30, screenHeight / 2 - 50, 15, 100, "white", 0);
    let player2 = new Player(screenWidth - 30 - 15, screenHeight /2 - 50, 15, 100, "white", 0);

    let ball = new Ball(screenWidth / 2, screenHeight /2, 10, "white");

    // Boucle d'animation
    function gameLoop() {
        clearScreen(ctx, screenWidth, screenHeight); // Efface l'écran
        let [cursorX, cursorY] = getMousePos();
        player1.draw(ctx);
        player2.draw(ctx);
        if(cursorX < screenWidth / 2) player1.move(cursorY, screenHeight);
        else player2.move(cursorY, screenHeight);
        ball.move(); // Déplace la balle
        let score = ball.bounce(screenWidth, screenHeight, [player1.x, player1.y], [player2.x, player2.y]); // Vérifie les rebonds
        ball.draw(ctx); // Redessine la balle
        if (score == "p1") player1.score +=1;
        else if (score == "p2") player2.score +=1;
        player1.drawScore(ctx, screenWidth / 4, 50);
        player2.drawScore(ctx, screenWidth / 4 + screenWidth / 2 - 30, 50);
        
        requestAnimationFrame(gameLoop); // Prochain frame
    }
    

    gameLoop(); // Démarre la boucle
}


// Function to get the current mouse position
function getMousePos() {
    return [cursor_x, cursor_y];
}
