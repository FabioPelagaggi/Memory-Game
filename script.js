var cards = document.querySelectorAll('.card_inner')
// var firstClick = false
var cardPair = []
var countingTime
var score = document.querySelector('#score').innerHTML

for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click',()=>{
        // if(!firstClick){time()}
        // firstClick = true        

        if(cards[i].state == 'unclicked'){
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            cardPair.push(cards[i])
            check()
        }

        else if(cards[i].state == 'clicked'){
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            cardPair = []
        }
    })
}

function gameStart(){
  settingUp()
  setTimeout(()=>{
    time()
  },3500)
}

function settingUp(){
  hideCards()
  shuffle()
  setTimeout(()=>{
    revealCards()
  },500)
  setTimeout(()=>{
    hideCards()
    cardsStateUnclicked()
  },3000)
}

function revealCards(){
  cards.forEach((card)=>{
    card.style.transform = 'rotateY(180deg)'
  })
}

function hideCards(){
  cards.forEach((card)=>{
    card.style.transform = 'rotateY(0deg)'
  })
}

function cardsStateUnclicked(){
  cards.forEach((card)=>{
    card.state = 'unclicked'
  })

}

function check(){
    if(cardPair.length==2){
        if(cardPair[0].querySelector('img').src==cardPair[1].querySelector('img').src){
            matched()
        }
        else{
            unmatched(cardPair[0],cardPair[1])
        }
    }  
}

function matched(){
  cardPair[0].state='blocked'
  cardPair[1].state='blocked'
  cardPair = []

  score++
  document.querySelector('#score').innerHTML = score
  if(score == 8){
    clearInterval(countingTime)
  }
}

function unmatched(firstCard,secondCard){
    setTimeout(()=>{
        firstCard.state = 'unclicked'
        secondCard.state = 'unclicked'
        firstCard.style.transform = "rotateY(0deg)"
        secondCard.style.transform = "rotateY(0deg)"
    },1500)
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
    cardPair = []
}

function time(){
    let secs = 0
    let mins = 0
    let SS
    let MM

    countingTime = setInterval(()=>{
      secs++
      if(secs==60){secs=0; mins++}

      secs<10?SS=`0${secs}`:SS=`${secs}`
      mins<10?MM=`0${mins}`:SS=`${mins}`
      
      document.querySelector('#time').innerHTML = `${MM}:${SS}`
    }, 1000)
}

function shuffle(){
    let images = document.querySelectorAll('img')
    let srcs = ["images/android.png", "images/chrome.png", "images/facebook.png", "images/firefox.png", "images/googleplus.png", "images/html5.png", "images/twitter.png", "images/windows.png", "images/android.png", "images/chrome.png", "images/facebook.png", "images/firefox.png", "images/googleplus.png", "images/html5.png", "images/twitter.png", "images/windows.png"]
    
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
      }
      
      for(let i=0; i<images.length; i++){
          images[i].src = srcs[i]
      }
}