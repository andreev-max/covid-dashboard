const backspace = document.querySelector(".backspace"),
    caps = document.querySelector('.caps'),
    enter = document.querySelector('.enter'),
    shift = document.querySelector('.shift'),
    done = document.querySelector('.done'),
    volume = document.querySelector('.volume'),
    space = document.querySelector('.space'),
    micro = document.querySelector('.micro'),
    btnKeyboard = document.querySelector('.keyboard-button-display'),
    keys = document.querySelectorAll('.keyboard__key'),
    keyboard = document.querySelector('.keyboard'),
    letters = document.querySelectorAll('.letter');

const properties = {
    caps: false,
    sound: false,
    shift: false,
    microfone: false
};


const lettersShift = [
    "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"",
    "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"
];
const lettersStandard = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
];

const createIconHTML = (src) => {
    return `<img src="${src}">`;
};

btnKeyboard.addEventListener("click", () => {
    keyboard.classList.toggle("keyboard--hidden")
});

done.addEventListener("click", () => {
    keyboard.classList.add("keyboard--hidden")
});

space.addEventListener("click", () => {
    display.value += " ";
    searchCovid += " ";
    showList(selectedOption);
});

enter.addEventListener("click", () => {
    if (properties.sound) playSound();
    display.value += "\n";
    showList(selectedOption);
})

backspace.addEventListener('click', () => {
    if (properties.sound) playSound();
    display.value = display.value.substring(0, display.value.length - 1);
    searchCovid = searchCovid.substring(0, searchCovid.length - 1);
    showList(selectedOption);
});

caps.addEventListener("click", () => {
    properties.caps = !properties.caps;
    if (properties.sound) playSound();
    caps.classList.toggle("keyboard__key--active");

    for (const key of keys) {
        if (key.childElementCount === 0) {
            if (properties.caps) {
                key.textContent = key.textContent.toUpperCase()
            } else {
                key.textContent = key.textContent.toLowerCase()
            }
        }
    }
});

shift.addEventListener("click", () => {
    shift.classList.toggle("keyboard__key--active")
    properties.shift = !properties.shift;
    if (properties.sound) playSound();
    if (properties.shift) {
        for (let i = 0; i < letters.length; i++) {
            letters[i].textContent = properties.caps ? lettersShift[i].toLowerCase() : lettersShift[i]
        }
    } else {
        for (let i = 0; i < letters.length; i++) {
            letters[i].textContent = lettersStandard[i]
        }
    }
});


letters.forEach(letter => {
    letter.addEventListener("click", () => {
        if (properties.sound) playSound();
        display.value += letter.textContent;
        searchCovid += letter.textContent;
        showList(selectedOption);
    })
});

volume.addEventListener("click", () => {

    properties.sound = !properties.sound
    properties.sound ? volume.innerHTML = createIconHTML("/assets/volume_up.png") : volume.innerHTML = createIconHTML("/assets/volume_off.png");
});


function playSound() {
    const audio = new Audio();
    audio.src = "/assets/tink.wav";
    audio.currentTime = 0;
    audio.play();
}


micro.addEventListener("click", () => {
    properties.microfone = !properties.microfone;
    properties.microfone ? micro.innerHTML = createIconHTML("/assets/mic.png") : micro.innerHTML = createIconHTML("/assets/mic_off.png");
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let rec = new SpeechRecognition();
    rec.interimResults = true;
    rec.lang = 'en-US';
    rec.addEventListener("result", function (e) {
        let text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
            display.value = text;
            searchCovid += text;
        rec.addEventListener('end', rec.start);
    });
    properties.microfone ? rec.start() : rec.abort();
});