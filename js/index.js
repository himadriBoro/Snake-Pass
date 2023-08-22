//  Constants & Variables

let snakeVelo = {x: 0, y: 0}; 

const foodTone = new Audio("music/food.mp3");
const gameOverTone = new Audio("music/gameover.mp3");
const movingTone = new Audio("music/moving.mp3");


let speed = 5;
let score = 0;

let lastPaintTime = 0;

let snakeArr = [
    {x: 5, y: 7}
];

food = {x: 2, y: 3};






// logic of the code

movingTone.play();

window.requestAnimationFrame(main);
window.addEventListener('keydown', c=>{

    snakeVelo = {x: 0, y: 1} 
    movingTone.play();

    switch (c.key) {

         case "ArrowUp":
            console.log("ArrowUp");
            snakeVelo.x = 0;
            snakeVelo.y = -1;
            break;


         case "ArrowDown":
            console.log("ArrowDown");
            snakeVelo.x = 0;
            snakeVelo.y = 1;
            break;


         case "ArrowLeft":
            console.log("ArrowLeft");
            snakeVelo.x = -1;
            snakeVelo.y = 0;
            break;


         case "ArrowRight":
            console.log("ArrowRight");
            snakeVelo.x = 1;
            snakeVelo.y = 0;
            break;


         default:
            break;
    }

});

//Functions

function main(btime) {
    window.requestAnimationFrame(main);
     console.log(btime);

    if((btime - lastPaintTime)/1000 < 1/speed){
        return;
    }

    lastPaintTime = btime;
    gameWork();
}


function passOut(snake) {

    // If the snake bum into itself then game will be over
    for (let r = 1; r < snakeArr.length; r++) {
        if(snake[r].x === snake[0].x && snake[r].y === snake[0].y){
            return true;
        }
    }
    // If the snake bum into the wall then game will be over
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){

        return true;
    }
        
    return false;
}

function gameWork(){

//  Refreshing the snake  & Food

    if(passOut(snakeArr)){

        gameOverTone.play();
        movingTone.pause();

        snakeVelo =  {x: 0, y: 0}; 
        alert("GAME OVER!!! Lets try again!");
        snakeArr = [{x: 5, y: 7}];

        movingTone.play();
        score = 0; 
    }

// If snake has eaten the food then increase the score and reproduce the food

    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodTone.play();
        score += 1;
        
        
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + snakeVelo.x, y: snakeArr[0].y + snakeVelo.y});

        let p = 2;
        let q = 16;

        food = {x: Math.round(p + (q-p)* Math.random()), y: Math.round(p + (q-p)* Math.random())}
    }

// Movement of the snake

    for (let j = snakeArr.length - 2; j>=0; j--) { 
        snakeArr[j+1] = {...snakeArr[j]};
    }

    snakeArr[0].x += snakeVelo.x;
    snakeArr[0].y += snakeVelo.y;

//show the snake and Food

// show the snake

    board.innerHTML = "";
    snakeArr.forEach((d, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = d.y;
        snakeElement.style.gridColumnStart = d.x;

        if(index === 0){
            snakeElement.classList.add('head');
        
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

// show the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}