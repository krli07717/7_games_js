const squares = document.querySelectorAll(".square")
const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")

let seconds = 60;
let points = 0;
let hit = -1;

const moveMole = () => {
    for (let square of squares) {
        square.classList.remove("mole");
        square.removeEventListener("mouseup",()=>console.log("oops"))
    }
    hit = Math.floor(Math.random() * 9)
    let random = squares[hit];
    random.classList.add("mole");
}

squares.forEach((square)=>{
    square.addEventListener("mouseup", ()=>{
        if (square.id == hit) {
            points++;
            score.textContent = points;
        }
    })
})


const countDown = () => {
    seconds--;
    timeLeft.textContent = seconds;
    if (seconds===0) {
        setTimeout(()=>{
            clearInterval(timerId);
            alert(`You earn ${points} points.`);
        },50)
    }
    moveMole();
}

const timerId = setInterval(()=> countDown(), 1000)