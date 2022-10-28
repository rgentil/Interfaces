class canvas_ficha extends canvas_objeto {
    constructor(jugador, id, context, posInicialX, posInicialY, imagen, color) {
        super(jugador, context, posInicialX, posInicialY, imagen, color);
        this.radio = 25//Math.round(Math.random() * 100);
        this.anguloDesde = 0;
        this.anguloHasta = 2 * Math.PI;
        this.habilitada = false;
        this.id = id;
    }

    //Si se encuentra una posicion en el tablero se lleva a esa posicion
    //sino vuelve al inicio
    setPosicionFinal(posX, posY) {
        this.posCanvasX = posX;
        this.posCanvasY = posY;
        this.posInicialX = posX;
        this.posInicialY = posY;
    }

    setPosicionInicial() {
        this.posCanvasX = this.posInicialX;
        this.posCanvasY = this.posInicialY;
    }

    draw() {
        this.context.save();
        this.context.beginPath();
        //this.context.fillStyle = this.color;
        this.context.arc(this.posCanvasX, this.posCanvasY, this.radio, this.anguloDesde, this.anguloHasta);
        //this.context.fill();
        this.context.closePath();
        this.context.clip();
        this.context.drawImage(this.imagen, this.posCanvasX-25, this.posCanvasY-25, 50, 50);
        this.context.restore();
    }

    getRadio() {
        return this.radio;
    }

    isHabilitada() {
        return this.habilitada;
    }

    setHabilitada(valor) {
        this.habilitada = valor;
    }

    getId() {
        return this.id;
    }

}