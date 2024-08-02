const cards = document.querySelectorAll(".card");

let matched = 0, cardOne, cardTwo,disableCheck = false;

function shuffleCard() {
    matched = 0
    cardOne = cardTwo = '';
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(()=>{
      return Math.random() > 0.5 ? 1 : -1;
    })
    cards.forEach((card,ind)=>{
        card.classList.remove('flip');
        card.querySelector('.back-view img').src = `images/img-${arr[ind]}.png`;
        card.addEventListener("click", flipCard);
    })
}
shuffleCard()

function flipCard({ target: clickedCard }) {

    if(!cardOne != clickedCard && !disableCheck){
        clickedCard.classList.add('flip');
        if (!cardOne) return cardOne = clickedCard;
        cardTwo = clickedCard;
        disableCheck = true;
        imgViewOne = cardOne.querySelector('.back-view img').src;
        imgViewTwo = cardTwo.querySelector('.back-view img').src;
        matchImageCheck(imgViewOne, imgViewTwo);
    }    
}

function matchImageCheck(img1,img2) {
    if (img1 === img2) {
        matched++;
        if(matched == 8)  setTimeout(()=> shuffleCard(),1000)
        cardOne.removeEventListener('click',flipCard)
        cardTwo.removeEventListener('click',flipCard)
        cardOne = cardTwo = '';
      return disableCheck = false;
    }
   setTimeout(()=>{
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake')
   },500);

   setTimeout(()=>{
    cardOne.classList.remove('shake','flip');
    cardTwo.classList.remove('shake','flip');
    cardOne = cardTwo = '';
    disableCheck = false;
   },1000)
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);

})