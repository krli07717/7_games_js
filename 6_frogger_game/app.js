const squares = document.querySelectorAll(".grid div")
const carsLeft = document.querySelectorAll(".car-left")
const carsRight = document.querySelectorAll(".car-right")
const logsLeft = document.querySelectorAll(".log-left")
const logsRight = document.querySelectorAll(".log-right")
const timeLeft = document.querySelector("#time-left")
const result = document.querySelector("#result")
const btn = document.querySelector("button")
let seconds = 20;
result.innerHTML = seconds;
let width = 9;
let frogIndex = 76;
let timerId;

squares[frogIndex].classList.add("frog");

const checkWin = () => {
    setTimeout(()=> {
       if (squares[frogIndex].classList.contains("ending-block")) {
        clearInterval(timerId);
        document.removeEventListener("keyup",moveFrog)
        alert("you win")
        } 
    },80)
    
}

const checkLose = () => {
    setTimeout(()=> {
        if (squares[frogIndex].classList.contains("c1") ||
            squares[frogIndex].classList.contains("l4") ||
            squares[frogIndex].classList.contains("l5")) {
            clearInterval(timerId);
            document.removeEventListener("keyup",moveFrog)
            alert("you lose");
        }
    },80)
}

const moveFrog = (e) => {
    squares[frogIndex].classList.remove("frog");
    switch (e.keyCode) {
        case 37:
            if (frogIndex % width !== 0) {
                frogIndex--;
            }
            break;
        case 38:
            if (frogIndex - width >= 0) {
                frogIndex -= width;
            }
            break;
        case 39:
            if (frogIndex % width !== width-1) {
                frogIndex++;
            }
            break;
        case 40:
            if (frogIndex + width < width**2) {
                frogIndex += width;
            }
            break;
    }
    squares[frogIndex].classList.add("frog");
    checkWin();
    checkLose();
}

const moveWithLogLeft = () => {
    if (frogIndex >= 27 && frogIndex < 35) {
        squares[frogIndex].classList.remove('frog')
        frogIndex += 1
        squares[frogIndex].classList.add('frog')
      }
}

const moveWithLogRight = () => {
    if (frogIndex > 18 && frogIndex <= 26) {
        squares[frogIndex].classList.remove('frog')
        frogIndex -= 1
        squares[frogIndex].classList.add('frog')
      }
}

const moveCarLeft = (carLeft) => {
    switch(true) {
        case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;
        }
}

const moveCarRight = (carRight) => {
    switch(true) {
        case carRight.classList.contains("c2"):
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;
        case carRight.classList.contains("c3"):
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        }
}

const moveLogLeft = (logLeft) => {
    switch(true) {
        case logLeft.classList.contains("l1"):
            logLeft.classList.remove("l1");
            logLeft.classList.add("l2");
            break;
        case logLeft.classList.contains("l2"):
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;
        case logLeft.classList.contains("l3"):
            logLeft.classList.remove("l3");
            logLeft.classList.add("l4");
            break;
        case logLeft.classList.contains("l4"):
            logLeft.classList.remove("l4");
            logLeft.classList.add("l5");
            break;
        case logLeft.classList.contains("l5"):
            logLeft.classList.remove("l5");
            logLeft.classList.add("l1");
            break;
        }
}

const moveLogRight = (logRight) => {
    switch(true) {
        case logRight.classList.contains("l3"):
            logRight.classList.remove("l3");
            logRight.classList.add("l2");
            break;
        case logRight.classList.contains("l4"):
            logRight.classList.remove("l4");
            logRight.classList.add("l3");
            break;
        case logRight.classList.contains("l5"):
            logRight.classList.remove("l5");
            logRight.classList.add("l4");
            break;
        case logRight.classList.contains("l1"):
            logRight.classList.remove("l1");
            logRight.classList.add("l5");
            break;
        case logRight.classList.contains("l2"):
            logRight.classList.remove("l2");
            logRight.classList.add("l1");
            break;
        }
}

const moveThings = () => {
    seconds--;
    result.innerHTML = seconds;
    carsLeft.forEach((carLeft)=>moveCarLeft(carLeft));
    carsRight.forEach((carRight)=>moveCarRight(carRight));
    logsLeft.forEach((logLeft)=>moveLogLeft(logLeft));
    logsRight.forEach((logRight)=>moveLogRight(logRight));
    moveWithLogLeft();
    moveWithLogRight();
    if (seconds === 0) {
        clearInterval(timerId);
        document.removeEventListener("keyup",moveFrog)
        alert("you lose");
    }
    checkLose();
}

btn.addEventListener("click", () => {
    if (timerId) {
        clearInterval(timerId);
    }
    squares[frogIndex].classList.remove("frog");
    seconds = 20;
    result.innerHTML = seconds;
    frogIndex = 76;
    squares[frogIndex].classList.add("frog");
    timerId = setInterval(moveThings,1000)
    document.addEventListener("keyup",moveFrog)
})