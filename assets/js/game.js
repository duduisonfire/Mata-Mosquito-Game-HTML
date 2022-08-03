let windowHeight;
let windowWidth;

function gameBoardSize(){
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

function randomPosition(flySize, flySide){
    let positionX = Math.floor(Math.random() * windowWidth) - 140;
    let positionY = Math.floor(Math.random() * windowHeight) - 140;
    positionX = positionX < 0 ? 0 : positionX;
    positionY = positionY < 0 ? 0 : positionY;

    let fly = document.createElement('img');
    fly.classList.add(flySize);
    fly.classList.add(flySide);
    fly.id = 'fly';
    fly.src = './assets/imgs/mosca.png'
    fly.style.left = positionX + 'px';
    fly.style.top = positionY + 'px';
    fly.style.position = 'absolute'
    fly.onclick = function(){
        this.remove();
    }
    document.body.appendChild(fly);
}

function flyRandomSize(){
    let flySize = Math.floor(Math.random() * 3);
    switch (flySize){
        case 0: return 'fly1'; break;
        case 1: return 'fly2'; break;
        case 2: return 'fly3'; break;
    }
}

function flyRandomSide(){
    let flySide = Math.floor(Math.random() * 2);
    switch (flySide){
        case 0: return 'flySide1'; break;
        case 1: return 'flySide2'; break;
    }
}

function gameOver(){
    clearInterval(flyGenerator);
    clearInterval(timer);
    let endGame = document.createElement('div');
    let endImg = document.createElement('img');
    let endButton = document.createElement('button');
    endImg.src = './assets/imgs/game_over.png';
    endButton.textContent = 'reiniciar';
    endButton.classList.add('end-button');
    endButton.onclick = function(){
        window.location.href = './index.html';
    }
    endGame.classList.add('game-over');
    endGame.appendChild(endImg);
    endGame.appendChild(endButton);
    document.body.appendChild(endGame);
    let fly = document.querySelector('#fly');
    fly.remove();
} 

function victory(){
    clearInterval(flyGenerator);
    clearInterval(timer);
    let endGame = document.createElement('div');
    let endImg = document.createElement('img');
    let endButton = document.createElement('button');
    endImg.src = './assets/imgs/vitoria.png'; 
    endButton.textContent = 'reiniciar';
    endButton.classList.add('end-button');
    endButton.onclick = function(){
        window.location.href = './index.html';
    }
    endGame.classList.add('game-over');
    endGame.appendChild(endImg);
    endGame.appendChild(endButton);
    document.body.appendChild(endGame);
    let fly = document.querySelector('#fly');
    fly.remove();
}

gameBoardSize()

let time = 60;
let timer = setInterval(e => {
    document.querySelector('#time').innerHTML = `${time} segundos`;
    time -= 1;

    if (time < 0){
        victory()
    }
}, 1000)

let nivel;

switch (window.location.search){
    case '?facil': nivel = 2000; break;
    case '?normal': nivel = 1500; break;
    case '?dificil': nivel = 1000; break;
    case '?impossivel': nivel = 500; break;
}

let life = 3;

let flyGenerator = setInterval(e => {
    let fly = document.querySelector('#fly');
    if (fly){
        fly.remove();
        switch (life){
            case 3: document.querySelector('#l3').src = './assets/imgs/coracao_vazio.png'; life--; break;
            case 2: document.querySelector('#l2').src = './assets/imgs/coracao_vazio.png'; life--; break;
            case 1: {
                document.querySelector('#l1').src = './assets/imgs/coracao_vazio.png'; 
                gameOver(); 
                break;
            }
        }
    }

    let flySize = flyRandomSize();
    let flySide = flyRandomSide();
    randomPosition(flySize, flySide);
}, nivel);