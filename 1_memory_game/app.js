const allCards = [
    {
    name: 'fries',
    img: 'images/fries.png'
    },
    {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
    },
    {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
    },
    {
    name: 'pizza',
    img: 'images/pizza.png'
    },
    {
    name: 'milkshake',
    img: 'images/milkshake.png'
    },
    {
    name: 'hotdog',
    img: 'images/hotdog.png'
    },
    {
    name: 'fries',
    img: 'images/fries.png'
    },
    {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
    },
    {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
    },
    {
    name: 'pizza',
    img: 'images/pizza.png'
    },
    {
    name: 'milkshake',
    img: 'images/milkshake.png'
    },
    {
    name: 'hotdog',
    img: 'images/hotdog.png'
    }
]

allCards.sort(() => 0.5 - Math.random())

const grid = document.getElementsByClassName("grid")[0];
const score = document.getElementById("result");

let compareArray = [];
let boardIdChosen = [];
let points = 0

function createBoard() {
    score.textContent = points;
    for (let i = 0; i < allCards.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "./images/black.png");
        card.setAttribute("boardId", i);
        card.addEventListener("click",flipCard);
        grid.appendChild(card);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("img");
    const [card1, card2] = compareArray;
    const [boardId1, boardId2] = boardIdChosen;
    if (card1 === card2 && boardId1 !== boardId2) {
        cards[boardId1].setAttribute("src","./images/white.png");
        cards[boardId2].setAttribute("src","./images/white.png");
        cards[boardId1].removeEventListener("click",flipCard);
        cards[boardId2].removeEventListener("click",flipCard);
        points++;
        score.textContent = points;
        if(points===cards.length/2) {
            setTimeout(()=>alert("You win"),50)
        }
    } else {
        cards[boardId1].setAttribute("src","./images/black.png");
        cards[boardId2].setAttribute("src","./images/black.png");
    } 
    boardIdChosen = [];
    compareArray = [];
}

function flipCard() {
    const boardId = this.getAttribute("boardId")
    this.setAttribute("src",allCards[boardId].img)
    boardIdChosen.push(boardId)
    compareArray.push(allCards[boardId].name)
    console.log(compareArray);
    console.log(boardIdChosen);
    if (compareArray.length===2) {
        setTimeout(()=>checkMatch(),200)
    } else if (compareArray.length > 2) {
        const cards = document.querySelectorAll("img");
        boardIdChosen.map((id)=> cards[id].setAttribute("src","./images/black.png"));
        boardIdChosen = [];
        compareArray = [];
    }
}

createBoard()
