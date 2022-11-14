const burgerDiv = document.querySelector('#burgerDiv');
const menuBurger = document.querySelector('.headerRigth .menu_opciones');
const social = document.querySelector('.social');

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
    document.querySelector(".logo").style.display = 'none';
    document.querySelector(".logoMin").style.display = 'block'
    menuBurger.style.top = '100px';
  } else {
    document.querySelector(".nav-bar").style.height = '230px';
    document.querySelector(".logo").style.display = 'block';
    document.querySelector(".logoMin").style.display = 'none';
    menuBurger.style.top = '150px';
  }
}