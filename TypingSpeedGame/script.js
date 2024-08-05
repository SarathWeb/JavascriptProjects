const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let charIndex = 0, maxTime = 60, timeLeft = maxTime, typing = mistakes = 0;

function loadParagraph() {
    let randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    typingText.innerHTML = ''
    randomParagraph.split('').forEach((char) => {
        span = `<span>${char}</span>`;
        typingText.innerHTML += span;
        typingText.querySelectorAll('span')[0].classList.add('active');
    })
    typingText.addEventListener('click', () => inpField.focus());
    document.addEventListener('keydown', () => inpField.focus())
}
loadParagraph() // Load the span Element;

function initType() {
    userInput = inpField.value.split('')[charIndex];
    paraSpanText = typingText.querySelectorAll('span');
    if (charIndex < paraSpanText.length - 1 && timeLeft > 0) {
        if (!typing) {
            timerStart = setInterval(initTimer, 1000);
            typing = 1;
        }
        paraSpanText.forEach(span => span.classList.remove('active'));

        console.log(paraSpanText[charIndex].innerText, userInput);

        if (userInput == paraSpanText[charIndex].innerText) {
            paraSpanText[charIndex].classList.add('correct');
           
            console.log(userInput, paraSpanText[charIndex].innerText, 'user');
        } else if (userInput == undefined) {
            console.log(mistakes, 'mistakes', paraSpanText[mistakes]);
            mistakes--;
             if(mistakes == 0){
                paraSpanText[mistakes].classList.add('active')
             }
            return paraSpanText[mistakes].classList.remove('correct', 'incorrect')
        }
        else {
            paraSpanText[charIndex].classList.add('incorrect');
            mistakes++;

        }
    }
    paraSpanText[charIndex].classList.add('active')
    charIndex++;
  

}
inpField.addEventListener('input', initType);

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        wpmTag.innerText = Math.floor(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60)
    } else {
        clearInterval(timerStart);
        inpField.value = '';
    }

}

