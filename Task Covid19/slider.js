

let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.style.width = '450px';
const sliderWidth = parseInt(sliderContainer.style.width)
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = [...document.querySelectorAll('.slider-item')];
const itemsCount = sliderItems.length;
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const itemWidth = sliderWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const setPosition = () => {
   sliderTrack.style.transform = `translateX(${position}px)`;
} 

for (let i = 0; i < sliderItems.length; i++) {
   const sliderItem = sliderItems[i];
   sliderItem.style.minWidth = `${itemWidth}px`;
};


btnPrev.addEventListener('click', () => {
   position += movePosition;
   setPosition();
   checkBtns();
});

btnNext.addEventListener('click', () => {
   position -= movePosition;
   setPosition();
   checkBtns();
});


const checkBtns = () => {
   position === 0 ? btnPrev.setAttribute("disabled", "disabled") : btnPrev.removeAttribute("disabled", "disabled");
   position === -((itemsCount-slidesToShow) * itemWidth) ? btnNext.setAttribute("disabled", "disabled") : btnNext.removeAttribute("disabled", "disabled");
}

checkBtns();

