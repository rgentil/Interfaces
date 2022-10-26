class canvas_box extends canvas_objeto {
    constructor(jugador, context, posInicialX, posInicialY, imagen, ladoX, ladoY,color) {
        super(jugador, context, posInicialX, posInicialY, imagen, color);
        this.ladoX = ladoX;
        this.ladoY = ladoY;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#A1C25E';
        this.context.fillRect(this.posCanvasX, this.posCanvasY, this.ladoX, this.ladoY);
        this.context.closePath();
    }

    getLadoX() {
        return this.ladoX;
    }
    getLadoY() {
        return this.ladoY;
    }

}