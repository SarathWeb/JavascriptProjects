const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let timer,correctWord;

 const initTimer = (maxtime)=>{
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxtime > 0){
            maxtime--;
           return timeText.innerHTML = maxtime;
        }
        alert('Time is over you can the correct word');
         initWord();
    },1000)
 }

function initWord(){
    initTimer(30);
    randomWord = words[Math.floor(Math.random() * words.length)];
    correctWord = randomWord.word;
    wordArray = correctWord.split("")
    for(let i = wordArray.length - 1; i>0; i--){
    let j = Math.floor(Math.random() * (i+1));
        [wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]]
    }
     wordText.innerHTML = wordArray.join('');
     hintText.innerHTML = randomWord.hint;
}
initWord();

const checkWord = ()=>{
    userValue = inputField.value.toUpperCase();
    inputField.value = '';
    if(!userValue) return alert('please enter the input');
    if(correctWord.toUpperCase() !== userValue) return alert(`You find the wrong word '${userValue}'`)
    alert(`You find the Correct word '${correctWord}'`)
}

refreshBtn.addEventListener('click',()=> initWord());
checkBtn.addEventListener('click',checkWord)