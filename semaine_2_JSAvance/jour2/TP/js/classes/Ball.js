import GameElement from "./GameElement.js";

class Ball extends GameElement {
    #r;

    constructor(x, y, r, color) {
        super(x, y, color);
        this.#r = r;

        // Ajout de la vitesse pour contrôler le déplacement
        this.vx = 2; // Vitesse en x
        this.vy = 2; // Vitesse en y
    }

    set r(r) {
        this.#r = r;
    }

    get r() {
        return this.#r;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x += this.vx; // Déplace la balle sur l'axe x
        this.y += this.vy; // Déplace la balle sur l'axe y
    }

    bounce(width, height, player1Pos, player2Pos) {
        // Vérifie les collisions avec les murs horizontaux
        if (this.x - this.r <= 0) {
            this.x = width / 2;
            this.y = height / 2;
            this.vx = Math.abs(this.vx);
            return "p2"; // Retourne immédiatement "p2" si la balle touche le mur gauche
        }
        else if (this.x + this.r >= width) {
            this.x = width / 2;
            this.y = height / 2;
            this.vx = -Math.abs(this.vx);
            return "p1"; // Retourne immédiatement "p1" si la balle touche le mur droit
        }
    
        // Vérifie les collisions avec les murs verticaux
        if (this.y - this.r <= 0 || this.y + this.r >= height) {
            this.vy = -this.vy; // Inverse la direction en y
        }
    
        // Vérifie les collisions avec le joueur 1
        const [player1X, player1Y] = player1Pos;
        if (
            this.x - this.r <= player1X + 15 && // Bord droit de la raquette
            this.x >= player1X && // Bord gauche de la raquette
            this.y >= player1Y && // Bord supérieur
            this.y <= player1Y + 100 // Bord inférieur
        ) {
            this.vx = Math.abs(this.vx); // Inverse et dirige vers la droite
        }
    
        // Vérifie les collisions avec le joueur 2
        const [player2X, player2Y] = player2Pos;
        if (
            this.x + this.r >= player2X && // Bord gauche de la raquette
            this.x <= player2X + 15 && // Bord droit de la raquette
            this.y >= player2Y && // Bord supérieur
            this.y <= player2Y + 100 // Bord inférieur
        ) {
            this.vx = -Math.abs(this.vx); // Inverse et dirige vers la gauche
        }
    
        return null; // Aucun score si aucune collision
    }
    
}

export default Ball;
