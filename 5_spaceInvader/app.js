const score = document.querySelector("span");
const result = document.querySelector(".result")
const squares = document.querySelectorAll(".grid div")

let width = 15
let currentShooterIndex = 202
let currentInvaderIndex = 0
let alienInvadersTakenDown = []
let points = 0
let direction = 1
let invaderId;


const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add("invader");
}

squares[currentShooterIndex].classList.add("shooter");

const moveInvaders = () => {
    let rightEdge = alienInvaders[alienInvaders.length-1] % width === width-1
    let leftEdge = alienInvaders[0] % width === 0

    if (rightEdge && direction === 1) {
        direction = width;
    } else if (rightEdge && direction === width) {
        direction = -1;
    } else if (leftEdge && direction === -1) {
        direction = width;
    } else if (leftEdge && direction === width) {
        direction = 1;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!alienInvadersTakenDown.includes(i)) {
           squares[alienInvaders[i]].classList.add("invader");
        }        
    }

    if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
        clearInterval(invaderId);
        squares[currentShooterIndex].classList.add("boom")
        result.innerHTML = "You lose"
    }

    if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
        clearInterval(invaderId);
        squares[currentShooterIndex].classList.add("boom")
        result.innerHTML = "You lose"
    }

    //touch bottom lose
    for (let i = 0; i <= alienInvaders.length - 1; i++){
        if(alienInvaders[i] > (squares.length - (width -1))){
          result.innerHTML = 'Game Over'
          clearInterval(invaderId)
        }
    }

    //you win
    if (alienInvadersTakenDown.length === alienInvaders.length) {
        clearInterval(invaderId);
        result.innerHTML = "You win";
    }
}

invaderId = setInterval(moveInvaders,200)

const shoot = (e) => {
    let laserId;
    let laserIndex = currentShooterIndex;

    const moveLaser = () => {
        squares[laserIndex].classList.remove("laser");
        laserIndex -= width;
        squares[laserIndex].classList.add("laser");

        if(laserIndex < width) {
            clearInterval(laserId)
            setTimeout(() => squares[laserIndex].classList.remove('laser'), 100)
        }

        if (squares[laserIndex].classList.contains("invader")) {
            squares[laserIndex].classList.remove("laser");
            squares[laserIndex].classList.remove("invader");
            squares[laserIndex].classList.add("boom");
            setTimeout(()=>squares[laserIndex].classList.remove("boom"),120);
            clearInterval(laserId);

            alienInvadersTakenDown.push(alienInvaders.indexOf(laserIndex)) //remember taken's position in its array
            points = alienInvadersTakenDown.length;
            score.innerHTML = points;
        }
    }

    if (e.keyCode === 32) {
        laserId = setInterval(moveLaser, 80)
    }
}

const moveShooter = (e) => {
    squares[currentShooterIndex].classList.remove("shooter")
    switch(e.keyCode) {
        case 37:
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex--;
            }
            break;
        case 39:
            if (currentShooterIndex % width !== width-1) {
                currentShooterIndex++;
            }
            break;
    }
    squares[currentShooterIndex].classList.add("shooter")
}

document.addEventListener("keydown",moveShooter)
document.addEventListener("keyup",shoot)