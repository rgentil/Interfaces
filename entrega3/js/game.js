"use strict";

/** @type {CanvasRenderingContext2D} */

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {

    let heroTitleJugar = document.querySelector("#hero-title-jugar");
    heroTitleJugar.style.display = 'block';

    let heroTitleJugarOpciones = document.querySelector("#hero-title-jugar-opciones");
    heroTitleJugarOpciones.style.display = 'none';

    //heroTitleJugar.style.display = 'none';
    //heroTitleJugarOpciones.style.display = 'block';

    let btnPlay = document.querySelector("#btn-play-cel");
    btnPlay.addEventListener("click", function (evetn) {
        heroTitleJugar.style.display = 'none';
        heroTitleJugarOpciones.style.display = 'block';
    })

    let btnCancel = document.querySelector("#btn-play-cancel");
    btnCancel.addEventListener("click", function (evetn) {
        heroTitleJugar.style.display = 'block';
        heroTitleJugarOpciones.style.display = 'none';
    })


    let btnPlayStart = document.querySelector("#btn-play-start");
    btnPlayStart.addEventListener("click", function (evetn) {
        //Display solo canvas
        heroTitleJugar.style.display = 'none';
        heroTitleJugarOpciones.style.display = 'none';

        //Opciones seleccionadas
        //Dificultad
        let dificultad;
        let dificultades = document.getElementsByName('dificultad');
        for (let d of dificultades) {
            if (d.checked) {
                dificultad = d.value;
            }
        }
        console.log(dificultad);

        //Jugador 1
        //Nombre
        let nombre1 = document.getElementById('text-jugador1').value;
        console.log(nombre1);
        //Ficha
        let ficha1;
        let fichas1 = document.getElementsByName('targetgroup1');
        for (let ficha of fichas1) {
            if (ficha.checked) {
                ficha1 = ficha.value;
            }
        }
        console.log(ficha1);

        //Jugador 2
        //Nombre
        let nombre2 = document.getElementById('text-jugador2').value;
        console.log(nombre2);
        //Ficha
        let ficha2;
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }
        console.log(ficha2);
    })
}
