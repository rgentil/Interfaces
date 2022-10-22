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

}
