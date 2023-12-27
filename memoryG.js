
const section = document.querySelector('section');
const round = document.querySelector('span');
let roundCount = 4;


round.textContent =roundCount

// מערך כרטיסים
const getDate=()=>[
    {imgSrc: ' ./image/01.png', name:"ying&yang"},
    {imgSrc: './image/02.png', name:"moon&sun"},
    {imgSrc: ' ./image/03.jpg ', name:"fish"},
    {imgSrc: ' ./image/04.png ', name:"waves"},
    {imgSrc: './image/05.jpg', name:"view"},
    {imgSrc: ' ./image/01.png', name:"ying&yang"},
    {imgSrc: './image/02.png', name:"moon&sun"},
    {imgSrc: ' ./image/03.jpg', name:"fish"},
    {imgSrc: './image/04.png', name:"waves"},
    {imgSrc: './image/05.jpg', name:"view"}
]
function init() {
    const arrayAfterShuffling = shuffle(mainArray.concat(mainArray));
    const boardElement = document.getElementsByClassName("board")[0];
    //יצור אלמנט חדש ונותן לו calss
    arrayAfterShuffling.forEach((cardValue) => {
      let timerOn = true;
      let timerCount = 60;
      const timerElement = document.getElementsByClassName("timer")[0];
      const cardElement = document.createElement("div");
      boardElement.appendChild(cardElement);
      cardElement.className = "card";
      cardElement.value = cardValue;
      cardElement.onclick = (e) => {
          onClick(e);
          if (timerOn) {
              let timer = setInterval(() => {
                  --timerCount;
                  if(timerCount>=10){
                      timerElement.innerText='0:'+timerCount
                    }
                    else if(timerCount>0){
                        timerElement.innerText='0:0'+timerCount
                    }
                    else{
                        timerElement.innerText='0:00'
              clearInterval(timer)
            }
        }, 1000);
        timerOn=false
    }
};
});
}
// רנדומלי

const randomize =()=>{
    const cardData =getDate();
    cardData.sort(()=> Math.random() - 0.5);
    return cardData
}

// לג'רנט את הכרטיסים
const cardGenerator = ()=>{
    const cardData= randomize();
    // html card
    cardData.forEach((item) =>{
        const card= document.createElement('div');
        const face= document.createElement('img');
        const back= document.createElement('div');
        card.classList="card";
        face.classList="face";
        back.classList="back";
        //  image=>card
        face.src = item.imgSrc;
        card.setAttribute('name',item.name) ;
        //  dad>son
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);   
        
        
        card.addEventListener('click', (e)=>{
            
            card.classList.toggle('toggleCard');
            checkCards(e)
            
        })
    });
    
};

// בדיקה
const checkCards= (e)=> {
    const clickedCard = e.target;
    
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    
    console.log(flippedCards);
    // 
    if (flippedCards.length == 2) {
        if (flippedCards[0].getAttribute('name')===
        flippedCards[1].getAttribute('name')){
            console.log("match");
            
            flippedCards.forEach(card=>{
                card.classList.remove("flipped")
                card.style.pointerEvents ="none";
                
                
            });
            
        }
        else{
            console.log("worng");
            flippedCards.forEach(card=>{
                card.classList.remove("flipped")
                setTimeout(()=>card.classList.remove("toggleCard"),1000);
            });
            roundCount--;
            round.textContent=roundCount;
            if (roundCount===0){
                restart("try again🤷‍♂️");
            }
        }
    }
    
    if(toggleCard.length===10){
        console.log(101010);
        restart("you won👌")
    }
};

const restart =(text)=>{
    let cardData= randomize()
    let faces= document.querySelectorAll(".face");
    let cards= document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index)=>{
        cards[index].classList.remove('toggleCard');
        setTimeout(()=>{
            cards[index].style.pointerEvents="all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name",item.name); 
        },1000)
        
        
    });
    roundCount=4
    round.textContent= roundCount
    setTimeout(()=>window.alert(text),100)
    
};

playerName = prompt('what is your name?');
document.getElementById("playerName").innerText=playerName
document.getElementById("playerName").innerText=playerName

cardGenerator();

const reButton= document.querySelector('button')

reButton.addEventListener("click",(e)=> {

   restart("you can do it 💪")
});

