const burgerDiv = document.querySelector('#burgerDiv');
const menuBurger = document.querySelector('.headerRigth .menu_opciones');
const social = document.querySelector('.social');
const logo = document.querySelector('.logo');
const arrowLeft = document.querySelector('#idArrowLeftPreSale');
const arrowRight = document.querySelector('#idArrowRightPreSale');
const flipCards = document.querySelectorAll('.flip-card-inner');

/*Accion del menu hamburguesa*/
burgerDiv.addEventListener('click', e => {
  burgerDiv.classList.toggle('active');
  menuBurger.classList.toggle('open');
  social.classList.toggle('open');
});

window.onscroll = function () {
  scrollFunction();
}

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".nav-bar").style.height = "100px";
    logo.classList.add('min');
    menuBurger.style.top = '100px';
  } else {
    document.querySelector(".nav-bar").style.height = '230px';
    logo.classList.remove('min');
    menuBurger.style.top = '150px';
  }

  /* Animacion de las tarjetas al scrollear */
  const triggerBottom = window.innerHeight / 5 * 4;
  /*Flechas izquierda y derecha del carrusel*/
  const alTop = arrowLeft.getBoundingClientRect().top;
  if (alTop < triggerBottom) {
    arrowLeft.classList.add('transitionCarrusel');
    arrowRight.classList.add('transitionCarrusel');
  } else {
    arrowLeft.classList.remove('transitionCarrusel');
    arrowRight.classList.remove('transitionCarrusel');
  }
  /*Tarjetas del carrusel*/
  const triggerBottom1 = window.innerHeight / 7 * 6;
  flipCards.forEach(flipCard => {
    const fcTop = flipCard.getBoundingClientRect().top;
    if (fcTop < triggerBottom1) {
      flipCard.classList.add('transitionCarrusel');
    } else {
      flipCard.classList.remove('transitionCarrusel');
    }
  });

}