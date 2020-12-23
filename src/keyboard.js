import { display, selectedOptionPopulation, changerOption } from './htmlSelectors';
import showList from './list';
import iconOff from '../assets/icons/volume_off.png';
import iconOn from '../assets/icons/volume_up.png';
import music from '../assets/volume/tink.wav';

const backspace = document.querySelector('.backspace');
const caps = document.querySelector('.caps');
const enter = document.querySelector('.enter');
const shift = document.querySelector('.shift');
const done = document.querySelector('.done');
const volume = document.querySelector('.volume');
const space = document.querySelector('.space');
const btnKeyboard = document.querySelector('.keyboard-button-display');
const keys = [...document.querySelectorAll('.keyboard__key')];
const keyboard = document.querySelector('.keyboard');
const letters = document.querySelectorAll('.letter');

const properties = {
  caps: false,
  sound: false,
  shift: false,
};

// воспроизводит звук
function playSound() {
  const audio = new Audio();
  audio.src = music;
  audio.currentTime = 0;
  audio.play();
}

const lettersShift = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E',
  'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H',
  'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?',
];
const lettersStandard = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'q', 'w', 'e',
  'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h',
  'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
];

const createIconHTML = (src) => `<img src="${src}">`;

btnKeyboard.addEventListener('click', () => {
  keyboard.classList.toggle('keyboard--hidden');
});

done.addEventListener('click', () => {
  keyboard.classList.add('keyboard--hidden');
});

space.addEventListener('click', () => {
  display.value += ' ';
  showList(selectedOptionPopulation.value, changerOption.checked);
});

enter.addEventListener('click', () => {
  if (properties.sound) playSound();
  display.value += '\n';
  showList(selectedOptionPopulation.value, changerOption.checked);
});

backspace.addEventListener('click', () => {
  if (properties.sound) playSound();
  display.value = display.value.substring(0, display.value.length - 1);
  showList(selectedOptionPopulation.value, changerOption.checked);
});

caps.addEventListener('click', () => {
  properties.caps = !properties.caps;
  if (properties.sound) playSound();
  caps.classList.toggle('keyboard__key--active');

  keys.forEach((key) => {
    if (key.childElementCount === 0) {
      if (properties.caps) {
        // eslint-disable-next-line no-param-reassign
        key.textContent = key.textContent.toUpperCase();
      } else {
        // eslint-disable-next-line no-param-reassign
        key.textContent = key.textContent.toLowerCase();
      }
    }
  });
});

shift.addEventListener('click', () => {
  shift.classList.toggle('keyboard__key--active');
  properties.shift = !properties.shift;
  if (properties.sound) playSound();
  if (properties.shift) {
    for (let i = 0; i < letters.length; i += 1) {
      letters[i].textContent = properties.caps
        ? lettersShift[i].toLowerCase()
        : lettersShift[i];
    }
  } else {
    for (let i = 0; i < letters.length; i += 1) {
      letters[i].textContent = lettersStandard[i];
    }
  }
});

letters.forEach((letter) => {
  letter.addEventListener('click', () => {
    if (properties.sound) playSound();
    display.value += letter.textContent;
    showList(selectedOptionPopulation.value, changerOption.checked);
  });
});

volume.addEventListener('click', () => {
  properties.sound = !properties.sound;
  if (properties.sound) {
    volume.innerHTML = createIconHTML(iconOn);
  } else {
    volume.innerHTML = createIconHTML(iconOff);
  }
});

showList(selectedOptionPopulation.value, changerOption.checked);
