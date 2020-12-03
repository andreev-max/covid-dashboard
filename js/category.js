
const body = document.querySelector('body'),
   burger = document.querySelector('.header__burger'),
   nav = document.querySelector('.header-menu'),
   container = document.querySelector('.container'),
   cardsList = document.querySelectorAll('.card'),
   change = document.querySelector(".switch"),
   overlay = document.querySelector('.overlay');


const categoryCards = ['Animals', 'Berries', 'Body', 'Clothes', 'Emotions', 'Fruits', 'Sports', 'Vegetables'];
const sportsList = ['boxing', 'karate', 'swimming', 'basketball', 'bicycling', 'football', 'hockey', 'tennis'];
const categoryImages = ['Animals', 'Berries', 'Body', 'Clothes', 'Emotions', 'Fruits', 'Sports', 'Vegetables'];

const createIconHTML = (src) => {
   return `<img src="${src}">`;
};



for (let i = 0; i < cardsList.length; i++) {
   const card = cardsList[i];
   card.classList = 'card';


   const front = document.createElement('div');
   front.classList = 'front';
   card.appendChild(front);


   var back = document.createElement('div');
   back.classList = 'back';
   card.appendChild(back);


   let src = `/assets/img/sports/${sportsList[i]}.jpg`;
   front.style.backgroundImage = `url(${src})`;
   front.style.backgroundRepeat = "no-repeat";
   front.style.backgroundSize = `100% 80%`;
   back.style.backgroundImage = `url(${src})`;
   back.style.backgroundRepeat = "no-repeat";
   back.style.backgroundSize = `100% 80%`;


   var frontInfo = document.createElement('div');
   frontInfo.classList = 'info';
   front.appendChild(frontInfo);


   var soundButton = document.createElement('button');
   soundButton.classList = 'button';
   frontInfo.appendChild(soundButton);
   soundButton.innerHTML = createIconHTML("/assets/icons/volume_up.png");


   var englishWord = document.createElement('span');
   englishWord.classList = 'caption';
   frontInfo.appendChild(englishWord);
   englishWord.textContent = sportsList[i];


   var russianWord = document.createElement('span');
   russianWord.classList = 'caption';
   back.appendChild(russianWord);
   russianWord.textContent = 'RUSSIAN';


   var rotateButton = document.createElement('button');
   rotateButton.classList = 'button';
   frontInfo.appendChild(rotateButton);
   rotateButton.innerHTML = createIconHTML("/assets/icons/refresh.png");

   rotateButton.addEventListener('click', () => {
      //front.classList.add('rotate-small');
      //back.classList.add('rotate-big');
      rotate(i)
   });


   soundButton.addEventListener('click', () => {
      //front.classList.add('rotate-small');
      //back.classList.add('rotate-big');
      playSound(sportsList[i])
   });


   back.addEventListener('mouseout', () => {
      //front.classList.remove('rotate-small');
      //back.classList.remove('rotate-big');
      rotateBack(i)
   })


   card.addEventListener('click', () => {
      console.log(window.history)
   })
}


function playSound(index) {
   const audio = new Audio();
   audio.src = `/assets/audio/sports/${index}.mp3`;
   audio.currentTime = 0;
   audio.play();
}

function rotate(index) {
   const card = cardsList[index];
   const back = card.children[1];
   const front = card.children[0];
   front.classList.add('rotate-small');
   back.classList.add('rotate-big');
}

function rotateBack(index) {
   const card = cardsList[index];
   const back = card.children[1];
   const front = card.children[0];
   front.classList.remove('rotate-small');
   back.classList.remove('rotate-big');
}

function clear() {
   while (card.firstChild) {
      card.removeChild(card.firstChild);
   }
}



change.addEventListener('click', function () {
   container.classList.toggle('play');
});


burger.addEventListener('click', () => {
   burger.classList.toggle('active');
   nav.classList.toggle('active');
   body.classList.toggle('lock');
   overlay.classList.toggle('passive');
});


overlay.addEventListener('click', () => {
   burger.classList.toggle('active');
   nav.classList.toggle('active');
   body.classList.toggle('lock');
   overlay.classList.toggle('passive');
})