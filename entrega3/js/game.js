"use strict";

/** @type {CanvasRenderingContext2D} */

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {

    let dificultad;
    let nombre1;
    let ficha1;
    let nombre2;
    let ficha2;

    let timer = 5;
    let timerId;

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

    //Comentar para subir
    //divHeroGame.style.display = 'none';
    //canvas.style.display = 'block';
    //initDraw();
    //hasta aca

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

    let btnGameOut = document.querySelector("#btn-game-out");
    btnGameOut.addEventListener("click", function (event) {
        divHeroGame.style.display = 'block';
        contentCanvas.style.display = 'none';
        canvas.style.display = 'none';
        heroTitleJugar.style.display = 'block';
        heroTitleJugarOpciones.style.display = 'none';
    });

    let resultadoCanvas = document.querySelector(".resultado-canvas");

    let btnReiniciar = document.querySelector("#btn-reiniciar");
    btnReiniciar.addEventListener("click", function () {
        
        resultadoCanvas.style.display = 'none';
        clearTimeout(timerId);

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
        //Jugador 2
        //Nombre
        nombre2 = document.getElementById('text-jugador2').value;
        //Ficha
        ficha2;
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }

        initDraw();
        timer = 5;
        decreaseTimer();
    });

    let btnPlayStart = document.querySelector("#btn-play-start");
    btnPlayStart.addEventListener("click", function () {
        //Display solo canvas
        heroTitleJugar.style.display = 'none';
        heroTitleJugarOpciones.style.display = 'none';
        divHeroGame.style.display = 'none';
        contentCanvas.style.display = 'block';
        canvas.style.display = 'block';

        canvas.width = 1512;
        canvas.height = 700;

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
        //Jugador 2
        //Nombre
        nombre2 = document.getElementById('text-jugador2').value;
        //Ficha
        ficha2;
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }

        initDraw();
        timer = 5;
        decreaseTimer();
    });

    function initDraw() {
        //Para dibujar el fondo
        ctx.fillStyle = '#dddf6f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function decreaseTimer() {
        if (timer > 0) {
            timerId = setTimeout(decreaseTimer, 1000);
            timer--;
            document.querySelector(".timer").innerHTML = timer;
        }

        if (timer === 0) {
            clearTimeout(timerId);
            resultadoCanvas.style.display = 'flex';
            resultadoCanvas.innerHTML = 'Empate';
        }
    }
}
