"use strict";

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {

    const TIEMPO_DE_JUEGO = 300;
    const CANVAS_WIDTH = 725;
    const CANVAS_HEIGHT = 607;
    const CANVAS_IMG_BACKGROUND = "./img/map.png";
    const CANVAS_IMG_BOX = "./img/cbox.png";

    let imageFondo = new Image();
    let imagenFicha1 = new Image();
    let imagenFicha2 = new Image();
    let imagenBox = new Image();
    imagenBox.src = CANVAS_IMG_BOX;
    let dificultad;
    let turno_jugador_1 = true;
    let nombre1;
    let ficha1;
    let nombre2;
    let ficha2;

    let timer = TIEMPO_DE_JUEGO;
    let timerId;

    let arreglo_fichas_j1 = [];
    let ficha_j1_seleccionada = null;

    let arreglo_fichas_j2 = [];
    let ficha_j2_seleccionada = null;

    let arreglo_box = [];
    let boxSeleccionado = null;

    let inicioX = 0;
    let inicioY = 0;

    imageFondo.src = CANVAS_IMG_BACKGROUND;

    let divHeroGame = document.querySelector("#div-hero-game");
    divHeroGame.style.display = 'block';

    let contentCanvas = document.querySelector(".content-canvas");
    contentCanvas.style.display = 'none';

    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext('2d');
    canvas.style.display = 'none';

    let heroTitleJugar = document.querySelector("#hero-title-jugar");
    heroTitleJugar.style.display = 'block';

    let heroTitleJugarOpciones = document.querySelector("#hero-title-jugar-opciones");
    heroTitleJugarOpciones.style.display = 'none';

    let btnPlay = document.querySelector("#btn-play-cel");
    btnPlay.addEventListener("click", function (event) {
        heroTitleJugar.style.display = 'none';
        heroTitleJugarOpciones.style.display = 'block';
    });

    let btnCancel = document.querySelector("#btn-play-cancel");
    btnCancel.addEventListener("click", function (event) {
        heroTitleJugar.style.display = 'block';
        heroTitleJugarOpciones.style.display = 'none';
    });

    //Boton salir
    let btnGameOut = document.querySelector("#btn-game-out");
    btnGameOut.addEventListener("click", function (event) {
        divHeroGame.style.display = 'block';
        contentCanvas.style.display = 'none';
        canvas.style.display = 'none';
        heroTitleJugar.style.display = 'block';
        heroTitleJugarOpciones.style.display = 'none';
    });

    //Div en donde se va a mostrar el resultado del juego.
    let resultadoCanvas = document.querySelector(".resultado-canvas");

    //Boton reiniciar juego. Reinicia la partida
    let btnReiniciar = document.querySelector("#btn-reiniciar");
    btnReiniciar.addEventListener("click", function () {
        resultadoCanvas.style.display = 'none';
        clearTimeout(timerId);
        canvasDraw();
        timer = TIEMPO_DE_JUEGO;
        clearTimeout(timerId);
        decreaseTimer();
    });

    //Se inicia el juego. Boton jugar.
    let btnPlayStart = document.querySelector("#btn-play-start");
    btnPlayStart.addEventListener("click", function () {
        //Display solo canvas
        heroTitleJugar.style.display = 'none';
        heroTitleJugarOpciones.style.display = 'none';
        divHeroGame.style.display = 'none';
        contentCanvas.style.display = 'block';
        canvas.style.display = 'block';

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        //Opciones seleccionadas
        //Dificultad
        let dificultades = document.getElementsByName('dificultad');
        for (let d of dificultades) {
            if (d.checked) {
                dificultad = d.value;
            }
        }

        //Jugador 1
        //Nombre
        nombre1 = document.getElementById('text-jugador1').value;
        //Ficha
        let fichas1 = document.getElementsByName('targetgroup1');
        for (let ficha of fichas1) {
            if (ficha.checked) {
                ficha1 = ficha.value;
            }
        }

        imagenFicha1.src = "./img/" + ficha1 + ".png";

        //Jugador 2
        //Nombre
        nombre2 = document.getElementById('text-jugador2').value;
        //Ficha
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }

        imagenFicha2.src = "./img/" + ficha2 + ".png";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvasDraw();
        timer = TIEMPO_DE_JUEGO;
        clearTimeout(timerId);
        decreaseTimer();
    });

    //Funcion llamada para dibujar la pantalla
    function canvasDraw() {
        //Para dibujar el fondo
        ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 1; i++) {
            let f1 = new canvas_ficha(
                nombre1,
                'f1' + i + 1,
                ctx,
                35,
                300 - (i * 10),
                imagenFicha1, `rgba(${155},${155},${0},${155})`);
            f1.draw();
            arreglo_fichas_j1[i] = f1;
        }

        for (let i = 0; i < 1; i++) {
            let f2 = new canvas_ficha(
                nombre2,
                'f2' + i + 1,
                ctx,
                690,
                300 - (i * 10),
                imagenFicha2, `rgba(${100},${0},${100},${100})`);
            f2.draw();
            arreglo_fichas_j2[i] = f2;
        }

        for (let i = 0; i < 1; i++) {
            let b = new canvas_box(
                "",
                ctx,
                250 + (i * 68),
                535,
                imagenBox,
                65,
                65, `rgba(${0},${200},${200},${200})`);
            b.draw();
            arreglo_box[i] = b;
        }
    }

    //Eventos del mouse sobre el canvas

    //Click del mouse sostenido
    //Accion de hacer click y presionar
    canvas.addEventListener('mousedown', function (event) {
        let mousePos = getMousePos(event);
        //console.log('event.clientX: ' + event.clientX);
        //console.log('event.clientY: ' + event.clientY);
        //console.log('mousePos.x: ' + mousePos.x);
        //console.log('mousePos.y: ' + mousePos.y);

        for (var i = 0; i < arreglo_fichas_j1.length; i++) {
            let x = mousePos.x;
            let y = mousePos.y;

            //console.log('x: ' + x);
            //console.log('y: ' + y);
            //console.log('getPosCanvasX(): ' + arreglo_fichas_j1[i].getPosCanvasX());
            //console.log('getPosCanvasY(): ' + arreglo_fichas_j1[i].getPosCanvasY());
            let dx = Math.abs(x - arreglo_fichas_j1[i].getPosCanvasX());
            let dy = Math.abs(y - arreglo_fichas_j1[i].getPosCanvasY());
            console.log('dx: ' + dx);
            console.log('dy: ' + dy);
            let distancia = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            console.log('distancia: ' + distancia);
            console.log('radio: ' + arreglo_fichas_j1[i].getRadio());
            if (distancia <= arreglo_fichas_j1[i].getRadio() && arreglo_fichas_j1[i].isHabilitada()) {
                ficha_j1_seleccionada = arreglo_fichas_j1[i];
                inicioX = x; //mousePos.x - arreglo_fichas_j1[i].getPosCanvasX();
                inicioY = y;// mousePos.y - arreglo_fichas_j1[i].getPosCanvasY();
                console.log('inicioX: ' + inicioX);
                console.log('inicioY: ' + inicioY);
                break;
            }
        }
    });

    //Movimiento del mouse con el click apretado
    canvas.addEventListener('mousemove', function (event) {
        if (ficha_j1_seleccionada != null) {
            console.log('Moviendose la ficha ' + ficha_j1_seleccionada.getId());
            console.log('inicioX: ' + inicioX);
            console.log('event.clientX: ' + event.clientX);
            console.log('inicioY: ' + inicioY);
            console.log('event.clientY: ' + event.clientY);
            ficha_j1_seleccionada.setPosicionCanvas(
                event.clientX - inicioX - 270,
                event.clientY - inicioY + 300,

            )
            console.log('Ficha en posicion x ' + ficha_j1_seleccionada.getPosCanvasX());
            console.log('Ficha en posicion y ' + ficha_j1_seleccionada.getPosCanvasY());
        }
        canvasActualizar();
    });

    //Click del mouse levanta
    canvas.addEventListener('mouseup', function (event) {
        console.log('El raton NO se esta presionando');
        if (ficha_j1_seleccionada != null) {
            let mousePos = getMousePos(event);
            for (let i = 0; i < arreglo_box.length; i++) {
                if (arreglo_box[i].getPosCanvasX() < mousePos.x
                    && !arreglo_box[i].isOcupado()
                    && (arreglo_box[i].getLadoX() + arreglo_box[i].getPosCanvasX() > mousePos.x)
                    && arreglo_box[i].getPosCanvasY() < mousePos.y
                    && (arreglo_box[i].getLadoY() + arreglo_box[i].getPosCanvasY() > mousePos.y)
                ) {
                    arreglo_box[i].setOcupado(true);
                    boxSeleccionado = arreglo_box[i];
                }
                for (let y = 0; y < arreglo_fichas_j1.length; y++) {
                    if (boxSeleccionado != null
                        && ficha_j1_seleccionada.getId() === arreglo_fichas_j1[y].getId()) {
                        let posNueva = {
                            x: boxSeleccionado.getPosCanvasX() + (boxSeleccionado.getLadoX() / 2),
                            y: boxSeleccionado.getPosCanvasY() - 2 + ((boxSeleccionado.getLadoY() - arreglo_fichas_j1[y].getRadio()))
                        }
                        arreglo_fichas_j1[y].setHabilitada(false);
                        arreglo_fichas_j1[y].setPosicionFinal(posNueva.x, posNueva.y);
                    }
                    if (boxSeleccionado == null
                        && ficha_j1_seleccionada.getId() === arreglo_fichas_j1[y].getId()) {
                        arreglo_fichas_j1[y].setPosicionInicial();
                    }
                }
            }
            ficha_j1_seleccionada = null;
            boxSeleccionado = null;
        }
        canvasActualizar();
    });

    //Detectar posicion del mouse
    function getMousePos(event) {
        console.log('canvas.offsetLeft: ' + canvas.offsetLeft);
        console.log('canvas.offsetTop: ' + canvas.offsetTop);
        return {
            x: Math.round(event.clientX - canvas.offsetLeft) - 300,
            y: Math.round(event.clientY - canvas.offsetTop)
        }
    }

    function canvasActualizar() {
        ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);

        for (let i = 0; i < arreglo_box.length; i++) {
            arreglo_box[i].draw();
        }

        for (let i = 0; i < arreglo_fichas_j1.length; i++) {
            arreglo_fichas_j1[i].draw();
        }

        for (let i = 0; i < arreglo_fichas_j2.length; i++) {
            arreglo_fichas_j2[i].draw();
        }
    }

    //Funcion encargada de controlar el tiempo de partida
    function decreaseTimer() {
        if (timer > 0) {
            timerId = setTimeout(decreaseTimer, 1000);
            timer--;
            let minutes = Math.floor(timer / 60);
            let segundos = timer % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            document.querySelector(".timer-canvas").innerHTML = minutes + ' : ' + segundos;
        }

        if (timer === 0) {
            clearTimeout(timerId);
            resultadoCanvas.style.display = 'flex';
            resultadoCanvas.innerHTML = 'Empate';
        }
    }
}
