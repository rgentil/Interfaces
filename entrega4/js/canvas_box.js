class canvas_box extends canvas_objeto {
    constructor(jugador, context, posInicialX, posInicialY, imagen, ladoX, ladoY, color) {
        super(jugador, context, posInicialX, posInicialY, imagen, color);
        this.ladoX = ladoX;
        this.ladoY = ladoY;
        this.ocupado = false;
    }

    draw() {
        this.context.beginPath();
        this.context.fillRect(this.posCanvasX, this.posCanvasY, this.ladoX, this.ladoY);
        this.context.closePath();
        this.context.drawImage(this.imagen,this.posCanvasX,this.posCanvasY,this.ladoX,this.ladoY);
    }

    getLadoX() {
        return this.ladoX;
    }

    getLadoY() {
        return this.ladoY;
    }

    isOcupado() {
        return this.ocupado;
    }

    setOcupado(valor) {
        this.ocupado = valor;
    }

    setJugador(nombre) {
        this.jugador = nombre;
    }

}