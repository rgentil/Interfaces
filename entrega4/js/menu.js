const burgerDiv = document.querySelector('#burgerDiv');
const menuBurger = document.querySelector('.headerRigth .menu_opciones');
const social = document.querySelector('.social');
const logo = document.querySelector('.logo');

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
}