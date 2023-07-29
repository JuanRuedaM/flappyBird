const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

let birdLeft = 51 
let birdBottom = 300
let gratity = 2
let isGameOver = false
let gap = 450
let velocity = 20
let spawnVelocity = 3000
let points = 0

const btnPlay = document.createElement('button')
btnPlay.innerHTML = 'START'
btnPlay.style.left = '170px'
btnPlay.style.bottom = '350px'
gameDisplay.appendChild(btnPlay)

let gameTimerId
let generateID

const score = document.createElement('p')
score.innerHTML = '0'
gameDisplay.appendChild(score)


const startGame = () => {
  birdBottom -= gratity
  bird.style.bottom = birdBottom + 'px'
  bird.style.left = birdLeft + 'px'
}

const control = (e) => {
  if(e.keyCode === 32 || e.type === 'click'){
    jump()
  }
}

const jump = () => {
  if(birdBottom <= 500 ) {
    birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
  }
}

const generateObstacle = () => {

  let obstacleLeft = 500
  let randomHeight = Math.random() * 150
  let obstacleBottom = randomHeight

  const obstacle = document.createElement('div')
  const topObstacle = document.createElement('div')

  if(!isGameOver) {
    obstacle.classList.add('obstacle')
    topObstacle.classList.add('topObstacle')
  }

  gameDisplay.appendChild(obstacle)
  gameDisplay.appendChild(topObstacle)

  obstacle.style.left = obstacleLeft + 'px'
  obstacle.style.bottom = obstacleBottom + 'px'

  topObstacle.style.left = obstacleLeft + 'px'
  topObstacle.style.bottom = obstacleBottom + gap + 'px'


  if (velocity <= 5 || spawnVelocity <= 1000) {
    velocity = 5
    spawnVelocity = 1000
  } else {
    velocity = velocity - 1
    spawnVelocity = spawnVelocity - 130
  }

  const moveObstacle = () => {
    obstacleLeft -= 2
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.left = obstacleLeft + 'px'

    // removing obstacles
    if(obstacleLeft === -60 || isGameOver){
      clearInterval(timerId)
      gameDisplay.removeChild(obstacle)
      gameDisplay.removeChild(topObstacle)
    }
    // Adding points
    if (obstacleLeft === 50) { 
      points++
      score.innerHTML = points
    }
    // Game over
    if( (obstacleLeft > 30 && obstacleLeft < 100 && birdLeft === 51) &&  (birdBottom < obstacleBottom + 120 || birdBottom > obstacleBottom + gap - 210)|| birdBottom == -30){ 
      clearInterval(timerId)
      gameOver()
    }
  }

  let timerId = setInterval(moveObstacle, velocity)
  if(!isGameOver) {
    generateID = setTimeout(generateObstacle, spawnVelocity)
  } 
}

// Bird animations
let tmp = 0
const changeAnimation = () => {
  if (birdBottom >= tmp) {
    bird.style.backgroundImage = "url('./assets/fp-rising.png')"
  } else {
    bird.style.backgroundImage = "url('./assets/fp-normal.png')"
  }
  tmp = birdBottom
}

const gameOver = () => {
  clearTimeout(generateID)
  clearInterval(gameTimerId)
  clearInterval(animationID)
  isGameOver = true
  document.removeEventListener('keyup', control)
  document.removeEventListener('click', control)
  document.removeEventListener('touchmove', control)
  
  gameDisplay.appendChild(btnPlay)
}

// Start game
btnPlay.addEventListener(('click'), () => {
  document.querySelectorAll(".obstacle").forEach(el => el.remove());
  document.querySelectorAll(".topObstacle").forEach(el => el.remove());
  bird.style.backgroundImage = ""
  score.innerHTML = '0'
  birdLeft = 51 
  birdBottom = 300
  velocity = 20
  spawnVelocity = 3000
  points = 0
  isGameOver = false
  
  document.addEventListener('keyup', control)
  document.addEventListener('click', control)
  document.addEventListener('touchmove', control)

  gameTimerId = setInterval(startGame, 20)
  animationID = setInterval(changeAnimation, 100)
  generateObstacle()
  gameDisplay.removeChild(btnPlay)
})