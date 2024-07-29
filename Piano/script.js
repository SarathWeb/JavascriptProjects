const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

const audio = new Audio();

const playTune = (key) => {
    let allKeys = document.querySelector(`[data-key='${key}']`);
    allKeys.classList.add('active')
    audio.src = `tunes/${key}.wav`;
    audio.play();
    setTimeout(() => allKeys.classList.remove('active'), 150);
}
pianoKeys.forEach((key) => {
    key.addEventListener('click', () => playTune(key.dataset.key))
})
const volumeRange = (e) => {
    audio.volume = e.target.value
}
const showkeys = () => {
    pianoKeys.forEach(key => key.classList.toggle('hide'))
}
volumeSlider.addEventListener('input', volumeRange);
keysCheckbox.addEventListener('click', showkeys)

