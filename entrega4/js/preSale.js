const burgerDiv = document.querySelector('#burgerDiv');
const menuBurger = document.querySelector('.headerRigth .menu_opciones');
const social = document.querySelector('.social');
const logo = document.querySelector('.logo');
const arrowLeft = document.querySelector('#idArrowLeftPreSale');
const arrowRight = document.querySelector('#idArrowRightPreSale');
const flipCards = document.querySelectorAll('.flip-card-inner');
const spritSheetH1 = document.querySelectorAll('.sprit-sheet h1');
const textos = document.querySelectorAll(".texto");
const imgs = document.querySelectorAll(".img");


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
  let scrollY = this.scrollY;
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

  spritSheetH1.forEach(ssh1 => {
    let op = 0 + document.documentElement.scrollTop / 1400;
    if (op < 0.6) {
      ssh1.style.opacity = 0;
    }
    else {
      if (op < 0.7) {
        ssh1.style.opacity = 0.50;
      } else {

        ssh1.style.opacity = 1;
      }
    }
  });
  console.log(scrollY);
  let spritSheetBackgroundCenter = document.querySelector('#sprit-sheet-background-center');
  if (scrollY < 1100) {
    spritSheetBackgroundCenter.style.bottom = "-50px";
  } else {
    if (scrollY > 1100 && scrollY < 1200) {
      spritSheetBackgroundCenter.style.bottom = "-25px";
    } else {
      if (scrollY > 1200) {
        spritSheetBackgroundCenter.style.bottom = "2px";
      }
    }
  }

  let spritSheetBackgroundLeft = document.querySelector('#sprit-sheet-background-left');
  if (scrollY < 1100) {
    spritSheetBackgroundLeft.style.left = "-50px";
  } else {
    if (scrollY > 1100 && scrollY < 1200) {
      spritSheetBackgroundLeft.style.left = "-25px";
    } else {
      if (scrollY > 1200) {
        spritSheetBackgroundLeft.style.left = "2px";
      }
    }
  }

  let spritSheetBackgroundRigth = document.querySelector('#sprit-sheet-background-rigth');
  if (scrollY < 1100) {
    spritSheetBackgroundRigth.style.right = "-80px";
  } else {
    if (scrollY > 1100 && scrollY < 1200) {
      spritSheetBackgroundRigth.style.right = "-57px";
    } else {
      if (scrollY > 1200) {
        spritSheetBackgroundRigth.style.right = "-20px";
      }
    }
  }

  textos.forEach(function (t) {
    t.classList.add("oculto")
  })

  imgs.forEach(function (t) {
    t.classList.add("imgOculta")
  })

  if (scrollY < 1700) {
    textos[0].classList.remove("oculto");
    imgs[0].classList.remove("imgOculta");
  }
  else if (scrollY >= 1700 && scrollY < 2050) {
    textos[1].classList.remove("oculto");
    imgs[1].classList.remove("imgOculta");
  } else if (scrollY >= 2050 && scrollY < 2300) {
    textos[2].classList.remove("oculto")
    imgs[2].classList.remove("imgOculta");
  } else if (scrollY >= 2300 && scrollY < 2500) {
    textos[3].classList.remove("oculto");
    imgs[3].classList.remove("imgOculta");
  } else {
    if (scrollY >= 2500 && scrollY < 4900) {
      textos[4].classList.remove("oculto");
      imgs[4].classList.remove("imgOculta");
    }
  }

}