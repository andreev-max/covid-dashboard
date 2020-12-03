
const body = document.querySelector('body'),
  burger = document.querySelector('.header__burger'),
  nav = document.querySelector('.header-menu'),
  container = document.querySelector('.container'),
  cardsList = document.querySelectorAll('.card'),
  change = document.querySelector(".switch");


const properties = {
  color: false,
  running: false
}


const categoryCards = ['Animals', 'Berries', 'Body', 'Clothes', 'Emotions', 'Fruits', 'Sports', 'Vegetables'];
const sportsList = ['boxing', 'karate', 'swimming', 'basketball', 'bicycling', 'football', 'hockey', 'tennis'];
const categoryImages = ['Animals', 'Berries', 'Body', 'Clothes', 'Emotions', 'Fruits', 'Sports', 'Vegetables'];
console.log(cardsList)



for (let i = 0; i < cardsList.length; i++) {
  var card = cardsList[i];
  card.classList = 'card play'
  var caption = document.createElement('p');
  caption.classList = 'caption';
  card.appendChild(caption);
  caption.textContent = categoryCards[i];
  console.log(caption)
  let src = `/assets/img/category/${categoryCards[i]}.jpg`;
  card.style.backgroundImage = `url(${src})`;
  card.style.backgroundRepeat = "no-repeat";
  card.style.backgroundSize = `100% 80%`;
  card.addEventListener('click', function () {
    document.location = 'category.html'
    console.log(this.textContent)
  })
}


change.addEventListener('click', function () {
  properties.color = !properties.color;
});

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  body.classList.toggle('lock');
})