const squares = document.querySelectorAll(".grid div");
const score = document.querySelector("span")
const btn = document.querySelector(".start")

const width = 10;
let points = 0;
let appleIndex = 0;
let currentSnake = [2,1,0]
let direction = 1;
let speed = 0.95;
let intervalTime = 500;
let interval = 0;

const startGame = () => {
    currentSnake.forEach(index=>squares[index].classList.remove("dead"))
    currentSnake.forEach(index=>squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    points = 0;
    score.innerHTML = points;
    direction = 1;
    currentSnake = [2,1,0]
    randomApple();
    intervalTime = 500;
    currentSnake.forEach(index=>squares[index].classList.add("snake"))
    interval = setInterval(onMove,intervalTime)
}

const onMove = () => {
    // check border, self collision
    if (currentSnake[0] <= 9 && direction === -width ||
        currentSnake[0] % 10 === 9 && direction === 1 ||
        currentSnake[0] >=90 && direction === width ||
        currentSnake[0] % 10 === 0 && direction === -1 ||
        squares[currentSnake[0] + direction].classList.contains('snake')) {
        currentSnake.forEach(index=>squares[index].classList.add("dead"));
        return clearInterval(interval);
    } 

    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0]+direction);
    squares[currentSnake[0]].classList.add("snake")

    if (squares[currentSnake[0]].classList.contains("apple")) {
        points++;
        score.innerHTML = points;
        randomApple();
        currentSnake.push(tail);
        clearInterval(interval);
        intervalTime *= speed;
        interval = setInterval(onMove,intervalTime)
    }
}

const randomApple = () => {
    squares[appleIndex].classList.remove("apple");
    do {
       appleIndex = Math.floor(Math.random()*squares.length); 
    } while (squares[appleIndex].classList.contains("snake"))

    squares[appleIndex].classList.add("apple");
}

const control = (e) => {
    if (e.keyCode === 37) {
        console.log("left")
        direction = -1;
    } else if (e.keyCode === 38) {
        console.log("up")
        direction = -width;
    } else if (e.keyCode === 39) {
        console.log("right")
        direction = 1;
    } else if (e.keyCode === 40) {
        console.log("down")
        direction = width;
    }
}

btn.addEventListener("click", startGame);
document.addEventListener("keyup",control);