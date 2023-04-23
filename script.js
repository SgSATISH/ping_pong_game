const {body}=document;



const canvas=document.createElement('canvas');
const context=canvas.getContext('2d');
const width=500;
const height=700;


//paddle

const paddlewidth=50;
const paddleheight=20;
let paddlePlayerX =225;
let paddleComputerX=225
let paddleDiff=25
let paddleContect=false;

//ball
let ballX=width/2
let ballY=height/2
let ballRadius=5;

//score
let playerScore=0;
let computerScore=0;

//speed
let speedX=-2
let speedY=-2
let computerSpeed=3;
let trajectoryX=0.3;

let mouseMoved=false;
let playerMoved=false;






function renderCanvas(){
    context.fillStyle="white"
    context.fillRect(0,0,width,height)
    
    context.fillStyle="black";
    context.fillRect(paddleComputerX,10,paddlewidth,paddleheight)
    
    context.fillStyle="black";
    context.fillRect(paddlePlayerX,height-30,paddlewidth,paddleheight)
   



    context.beginPath();
    context.setLineDash([8]);
    context.moveTo(0,350);
    context.lineTo(500,350);
    context.strokeStyle="grey"
    context.stroke();

    //ball
   context.beginPath();
   context.arc(ballX,ballY,ballRadius, 2*Math.PI,false); 
   context.fillStyle="black"
   context.fill();

   //score

   context.font="32px Courier New"
   context.fillText(playerScore,20,canvas.height/2+50)
   context.fillText(computerScore,20,canvas.height/2-30)

}


function ballMove(){
    ballY+=-speedY;
    if(playerMoved && paddleContect){
        ballX += speedX
    }

}
 
function ballReset(){
    ballX=width/2;
    ballY=height/2;
    speedY=-3;


}

 function ballBoundries(){
    if(ballX < 0 && speedX < 0){
        speedX = -speedX
    }
if(ballX > width && speedX > 0){
    speedX=-speedX;
}

    if(ballY > height -paddleDiff){
        if(ballX > paddlePlayerX && ballX < paddlePlayerX + paddlewidth){
            paddleContect=true;
            if(playerMoved){
                speedY-=1;
            }
            speedY=-speedY
            trajectoryX = ballX-(paddlePlayerX + paddleDiff)
            speedX=trajectoryX=2;
        }
        else if(ballY>height){
            ballReset();
            computerScore++;
        }
  
    }

    if(ballY<paddleDiff){
        if(ballX > paddleComputerX && ballX < paddleComputerX + paddlewidth  ){
            if(playerMoved){
                speedY +=1;
            }
            speedY=-speedY
        }
        else if(ballY < 0){
          ballReset();
          playerScore++;
        }

    }

 }
function computerPaddle(){
    if(playerMoved){
        if(paddleComputerX + paddleDiff < ballX){
            paddleComputerX += computerSpeed;
        }
        else{
            paddleComputerX -= computerSpeed;
        }
    }
}

function animate(){
    ballBoundries()
    renderCanvas();
    ballMove();
    computerPaddle()
    window.requestAnimationFrame(animate);
}


function createCanvas(){
    canvas.height=height;
    canvas.width=width;
    body.appendChild(canvas);
    renderCanvas()
}
createCanvas();

function startGame(){
    createCanvas();
    animate();
   
    playerScore=0;
    computerScore=0;


    canvas.addEventListener('mousemove',(e)=>{
        playerMoved=true;
        paddlePlayerX=e.clientX-width-paddleDiff;

        if(paddlePlayerX<paddleDiff){
            paddlePlayerX=0;
        }
        if(paddlePlayerX > width-paddlewidth){
            paddlePlayerX = width-paddlewidth;
        }
    })

}
startGame()