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
    let columnas;
    let filas;
    let turno_jugador_1 = true;
    let nombre1;
    let ficha1;
    let nombre2;
    let ficha2;

    let fin_del_juego = false;

    let timer = TIEMPO_DE_JUEGO;
    let timerId;

    let arreglo_fichas_j1 = [];
    let ficha_j1_seleccionada = null;

    let arreglo_fichas_j2 = [];
    let ficha_j2_seleccionada = null;

    let matriz_box = [];
    let boxSeleccionado = null;

    let inicioX = 0;
    let inicioY = 0;

    imageFondo.src = CANVAS_IMG_BACKGROUND;

    //Controla que no se pueda seleccionar la misma ficha
    let ff11 = document.getElementsByName('targetgroup1');
    ff11.forEach(f => f.addEventListener("click", () => {
        let ff22 = document.getElementsByName('targetgroup2');
        for (let f22 of ff22) {
            f22.disabled = false;
            if (f22.value === f.value) {
                f22.disabled = true;
            }
        }
    }));

    let ff22 = document.getElementsByName('targetgroup2');
    ff22.forEach(f => f.addEventListener("click", () => {
        let ff11 = document.getElementsByName('targetgroup1');
        for (let f11 of ff11) {
            f11.disabled = false;
            if (f11.value === f.value) {
                f11.disabled = true;
            }
        }
    }));

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

    //Boton salir del juego
    let btnGameOut = document.querySelector("#btn-game-out");
    btnGameOut.addEventListener("click", function (event) {
        divHeroGame.style.display = 'block';
        contentCanvas.style.display = 'none';
        canvas.style.display = 'none';
        heroTitleJugar.style.display = 'block';
        heroTitleJugarOpciones.style.display = 'none';
        initVariables();
    });

    //Resultado final del juego. Ya sea porque haya un ganador o se haya terminado el tiempo de juego.
    let resultadoCanvas = document.querySelector(".resultado-canvas");

    //Muestro a quien le toca jugar en el turno actual. Al inicio jugador de la izquierda por defecto
    let turnoCanvas = document.querySelector(".turno-canvas");

    //Boton reiniciar juego. Reinicia la partida
    let btnReiniciar = document.querySelector("#btn-reiniciar");
    btnReiniciar.addEventListener("click", function () {
        initVariables();
    });

    //Inicializa variables al reiniciar o salir del juego.
    function initVariables() {
        resultadoCanvas.style.display = 'none';
        turno_jugador_1 = true;
        turnoCanvas.innerHTML = 'Juega ' + nombre1;
        arreglo_fichas_j1 = [];
        arreglo_fichas_j2 = [];
        matriz_box = [];
        ficha_j1_seleccionada = null;
        ficha_j2_seleccionada = null;
        boxSeleccionado = null;
        fin_del_juego = false;
        inicioX = 0;
        inicioY = 0;
        canvasDraw();
        timer = TIEMPO_DE_JUEGO;
        clearTimeout(timerId);
        decreaseTimer();
    }

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

        //Ayuda para ver por donde esta el mouse
        //Descomentar para ver coordenadas actaules del mouse
        /*
        var output = document.getElementById("output");
        canvas.addEventListener("mousemove", function (evt) {
            var mousePos = getMousePos(evt);
            marcarCoords(output, mousePos.x, mousePos.y)
        }, false);

        canvas.addEventListener("mouseout", function (evt) {
            limpiarCoords(output);
        }, false);
        */

        //Opciones seleccionadas
        //Dificultad
        let dificultades = document.getElementsByName('dificultad');
        for (let d of dificultades) {
            if (d.checked) {
                dificultad = Number(d.value);
                columnas = dificultad + 2;
                filas = dificultad + 1;
            }
        }

        //Jugador 1
        //Nombre
        nombre1 = document.getElementById('text-jugador1').value;
        if (!nombre1) nombre1 = 'Jugador 1';
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
        if (!nombre2) nombre2 = 'Jugador 2';
        //Ficha
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }

        imagenFicha2.src = "./img/" + ficha2 + ".png";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        initVariables();
    });

    //Funcion llamada para dibujar la pantalla al inicio de juego
    function canvasDraw() {
        //Para dibujar el fondo
        ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);

        let total_fichas = ((filas * columnas) / 2) + 1;
        for (let i = 0; i < total_fichas; i++) {
            let f1 = new canvas_ficha(
                nombre1,
                'f1' + i + 1,
                ctx,
                30,
                400 - (i * 5),
                imagenFicha1, `rgba(${155},${155},${0},${155})`);
            f1.draw();
            if (i === total_fichas - 1) {
                f1.setHabilitada(true);
            }
            arreglo_fichas_j1[i] = f1;
        }

        for (let i = 0; i < total_fichas; i++) {
            let f2 = new canvas_ficha(
                nombre2,
                'f2' + i + 1,
                ctx,
                690,
                400 - (i * 5),
                imagenFicha2, `rgba(${100},${0},${100},${100})`);
            f2.draw();
            if (i === total_fichas - 1) {
                f2.setHabilitada(true);
            }
            arreglo_fichas_j2[i] = f2;
        }

        let xInit;
        let yInit;
        switch (dificultad) {
            case 4:
                xInit = 180;
                yInit = 150;
                break;
            case 5:
                xInit = 155;
                yInit = 125;
                break;
            case 6:
                xInit = 125;
                yInit = 100;
                break;
            case 7:
                xInit = 100;
                yInit = 75;
                break;
        }

        for (let col = columnas; col >= 0; col--) {
            matriz_box[col] = [];
            for (let fil = filas; fil >= 0; fil--) {
                let b = new canvas_box(
                    "",
                    ctx,
                    xInit + (col * 54),
                    yInit + (fil * 54),
                    imagenBox,
                    52,
                    52, `rgba(${0},${200},${200},${200})`);
                b.draw();
                matriz_box[col][fil] = b;
            }
        }

    }

    //Eventos del mouse sobre el canvas
    //Solo se puede sacar la primer fichas, las demas estan deshabilitadas. 
    //Click del mouse sostenido
    //Accion de hacer click 
    canvas.addEventListener('mousedown', function (event) {
        if (!fin_del_juego) {
            let mousePos = getMousePos(event);
            if (turno_jugador_1) {
                for (let i = 0; i < arreglo_fichas_j1.length; i++) {
                    let x = mousePos.x;
                    let y = mousePos.y;
                    let dx = Math.abs(x - arreglo_fichas_j1[i].getPosCanvasX());
                    let dy = Math.abs(y - arreglo_fichas_j1[i].getPosCanvasY());
                    let distancia = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    if (distancia <= arreglo_fichas_j1[i].getRadio() && arreglo_fichas_j1[i].isHabilitada()) {
                        ficha_j1_seleccionada = arreglo_fichas_j1[i];
                        inicioX = arreglo_fichas_j1[i].getPosCanvasX();
                        inicioY = arreglo_fichas_j1[i].getPosCanvasY();
                        break;
                    }
                }
            } else {//Juega jugador dos.
                for (let i = 0; i < arreglo_fichas_j2.length; i++) {
                    let x = mousePos.x;
                    let y = mousePos.y;
                    let dx = Math.abs(x - arreglo_fichas_j2[i].getPosCanvasX());
                    let dy = Math.abs(y - arreglo_fichas_j2[i].getPosCanvasY());
                    let distancia = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    if (distancia <= arreglo_fichas_j2[i].getRadio() && arreglo_fichas_j2[i].isHabilitada()) {
                        ficha_j2_seleccionada = arreglo_fichas_j2[i];
                        inicioX = arreglo_fichas_j2[i].getPosCanvasX();
                        inicioY = arreglo_fichas_j2[i].getPosCanvasY();
                        break;
                    }
                }
            }
        }
    });

    //Movimiento del mouse con el click apretado
    canvas.addEventListener('mousemove', function (event) {
        let mousePos = getMousePos(event);
        if (turno_jugador_1) {
            if (ficha_j1_seleccionada != null) {
                ficha_j1_seleccionada.setPosicionCanvas(
                    mousePos.x,
                    mousePos.y
                )
            }
        } else {
            if (ficha_j2_seleccionada != null) {
                ficha_j2_seleccionada.setPosicionCanvas(
                    mousePos.x,
                    mousePos.y
                )
            }
        }
        canvasActualizar();
    });

    //Click del mouse levanta
    canvas.addEventListener('mouseup', function (event) {
        let validarPosX = -1;
        let validarPosY = -1;
        if (ficha_j1_seleccionada != null || ficha_j2_seleccionada != null) {
            let mousePos = getMousePos(event);
            for (let i = columnas; i >= 0 && !boxSeleccionado; i--) {
                //Solo se puede insertar una ficha desde arriba, por eso no recorre por filas
                //para validar que se haya soltada una ficha dentro del tablero.
                //Por eso se comenta el for por filas y se agrega let j = 0, para que recorra
                //solo la primer fila.
                //for (let j = filas; j >= 0 && !boxSeleccionado; j--) {
                let j = 0;
                if (matriz_box[i][j].getPosCanvasX() < mousePos.x
                    && !matriz_box[i][j].isOcupado()
                    && (matriz_box[i][j].getLadoX() + matriz_box[i][j].getPosCanvasX() > mousePos.x)
                    && matriz_box[i][j].getPosCanvasY() < mousePos.y
                    && (matriz_box[i][j].getLadoY() + matriz_box[i][j].getPosCanvasY() > mousePos.y)
                ) {//Si se suelta la ficha en un box
                    for (let fil = filas; fil >= 0 && !boxSeleccionado; fil--) {
                        if (!matriz_box[i][fil].isOcupado()) {
                            matriz_box[i][fil].setOcupado(true);
                            if (ficha_j1_seleccionada != null) {
                                matriz_box[i][fil].setJugador(ficha_j1_seleccionada.getJugador());
                            } else {
                                if (ficha_j2_seleccionada != null) {
                                    matriz_box[i][fil].setJugador(ficha_j2_seleccionada.getJugador());
                                }
                            }
                            boxSeleccionado = matriz_box[i][fil];
                            validarPosX = i;
                            validarPosY = fil;
                        }
                    }
                }
                //}
            }
        }
        if (turno_jugador_1 && ficha_j1_seleccionada != null) {
            for (let y = 0; y < arreglo_fichas_j1.length; y++) {
                if (ficha_j1_seleccionada.getId() === arreglo_fichas_j1[y].getId()) {
                    if (boxSeleccionado != null) {
                        let posNueva = {
                            x: boxSeleccionado.getPosCanvasX() + (boxSeleccionado.getLadoX() / 2),
                            y: boxSeleccionado.getPosCanvasY() - 1 + ((boxSeleccionado.getLadoY() - arreglo_fichas_j1[y].getRadio()))
                        }//Si hay que colocar la ficha

                        //Valida si hya un ganador
                        validarJugada(boxSeleccionado.getJugador(), validarPosX, validarPosY);

                        arreglo_fichas_j1[y].setHabilitada(false);
                        arreglo_fichas_j1[y].setPosicionFinal(posNueva.x, posNueva.y);
                        //Habilita la siguinte ficha
                        arreglo_fichas_j1[y - 1].setHabilitada(true);
                        //Si coloca la ficha cambia de turno
                        turno_jugador_1 = !turno_jugador_1;
                        turnoCanvas.innerHTML = 'Juega ' + nombre2;

                    } else {
                        //Vuelve al origen
                        if (boxSeleccionado == null
                            && ficha_j1_seleccionada.getId() === arreglo_fichas_j1[y].getId()) {
                            arreglo_fichas_j1[y].setPosicionInicial();
                        }
                    }
                    break;
                }
            }
            ficha_j1_seleccionada = null;
        } else {
            if (!turno_jugador_1 && ficha_j2_seleccionada != null) {
                for (let y = 0; y < arreglo_fichas_j2.length; y++) {
                    if (ficha_j2_seleccionada.getId() === arreglo_fichas_j2[y].getId()) {
                        if (boxSeleccionado != null) {
                            let posNueva = {
                                x: boxSeleccionado.getPosCanvasX() + (boxSeleccionado.getLadoX() / 2),
                                y: boxSeleccionado.getPosCanvasY() - 1 + ((boxSeleccionado.getLadoY() - arreglo_fichas_j2[y].getRadio()))
                            }//Si hay que colocar la ficha

                            //Valida si hya un ganador
                            validarJugada(boxSeleccionado.getJugador(), validarPosX, validarPosY);

                            arreglo_fichas_j2[y].setHabilitada(false);
                            arreglo_fichas_j2[y].setPosicionFinal(posNueva.x, posNueva.y);
                            //Habilita la siguinte ficha
                            arreglo_fichas_j2[y - 1].setHabilitada(true);
                            //Si coloca la ficha cambia de turno
                            turno_jugador_1 = !turno_jugador_1;
                            turnoCanvas.innerHTML = 'Juega ' + nombre1;
                        } else {
                            //Vuelve al origen
                            if (boxSeleccionado == null
                                && ficha_j2_seleccionada.getId() === arreglo_fichas_j2[y].getId()) {
                                arreglo_fichas_j2[y].setPosicionInicial();
                            }
                        }
                        break;
                    }
                }
                ficha_j2_seleccionada = null;
            }
        }
        boxSeleccionado = null;
        canvasActualizar();
    });

    //Luego de insertar una ficha valida si hay un ganador.
    function validarJugada(jugador, cInicial, fInicial) {
        let contador = 0;
        //Valido por columnad desde una posicion inicial hacia la izq y luego hacia la derecha
        for (let col = cInicial; col >= 0 && !fin_del_juego; col--) {
            if (matriz_box[col][fInicial].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
            } else {
                break;
            }
        }
        for (let col = cInicial + 1; col <= columnas && !fin_del_juego; col++) {
            if (matriz_box[col][fInicial].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
            } else {
                break;
            }
        }

        //Valido por filas hacia abajo y luego hacia arriba
        contador = 0;
        for (let fil = fInicial; fil >= 0 && !fin_del_juego; fil--) {
            if (matriz_box[cInicial][fil].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
            } else {
                break;
            }
        }
        for (let fil = fInicial + 1; fil <= filas && !fin_del_juego; fil++) {
            if (matriz_box[cInicial][fil].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
            } else {
                break;
            }
        }

        //Valido en diagonal 1
        contador = 0;
        let cDiagonal = cInicial;
        let fDiagonal = fInicial;
        while (cDiagonal <= columnas && fDiagonal >= 0 && !fin_del_juego) {
            if (matriz_box[cDiagonal][fDiagonal].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
                cDiagonal++;
                fDiagonal--;
            } else {
                break;
            }
        }

        cDiagonal = cInicial - 1;
        fDiagonal = fInicial + 1;
        while (cDiagonal >= 0 && fDiagonal <= filas && !fin_del_juego) {
            if (matriz_box[cDiagonal][fDiagonal].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
                cDiagonal--;
                fDiagonal++;
            } else {
                break;
            }
        }

        //Valido en diagonal 2
        contador = 0;
        cDiagonal = cInicial;
        fDiagonal = fInicial;
        while (cDiagonal >= 0 && fDiagonal >= 0 && !fin_del_juego) {
            if (matriz_box[cDiagonal][fDiagonal].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
                cDiagonal--;
                fDiagonal--;
            } else {
                break;
            }
        }
        cDiagonal = cInicial + 1;
        fDiagonal = fInicial + 1;
        while (cDiagonal <= columnas && fDiagonal <= filas && !fin_del_juego) {
            if (matriz_box[cDiagonal][fDiagonal].getJugador() === jugador) {
                contador++;
                if (contador == dificultad) {
                    finalizarJuego(jugador);
                }
                cDiagonal++;
                fDiagonal++;
            } else {
                break;
            }
        }
    }

    //Acciones finales del juego.
    function finalizarJuego(jugador) {
        clearTimeout(timerId);
        resultadoCanvas.style.display = 'flex';
        resultadoCanvas.innerHTML = 'Gan?? ' + jugador;
        fin_del_juego = true;
    }

    //Actualiza el canvas
    function canvasActualizar() {
        //Fondo
        ctx.drawImage(imageFondo, 0, 0, canvas.width, canvas.height);

        //Tablero
        for (let i = columnas; i >= 0; i--) {
            for (let j = filas; j >= 0; j--) {
                matriz_box[i][j].draw();
            }
        }

        //Fichas del jugador 1
        for (let i = 0; i < arreglo_fichas_j1.length; i++) {
            arreglo_fichas_j1[i].draw();
        }

        //Fichas del jugador 2
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
            fin_del_juego = true;
        }
    }

    //Detectar posicion del mouse
    function getMousePos(event) {
        let ClientRect = canvas.getBoundingClientRect();
        return { //objeto
            x: Math.round(event.clientX - ClientRect.left),
            y: Math.round(event.clientY - ClientRect.top)
        }
    }

    //Funciones para ver las coordonedas de la posicion del mouse
    //Habiltar para hacer correcciones viendo la posicion actual del mouse sobre el canvas
    /*
    function marcarCoords(output, x, y) {
        output.innerHTML = ("x: " + x + ", y: " + y);
        output.style.top = (y + 10) + "px";
        output.style.left = (x + 10) + "px";
        output.style.backgroundColor = "#FFF";
        output.style.border = "1px solid #d9d9d9"
        canvas.style.cursor = "pointer";
    }

    function limpiarCoords(output) {
        output.innerHTML = "";
        output.style.top = 0 + "px";
        output.style.left = 0 + "px";
        output.style.backgroundColor = "transparent"
        output.style.border = "none";
        canvas.style.cursor = "default";
    }
    */

}
