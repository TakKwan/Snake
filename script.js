const board = document.querySelector('.board')
const scoreBoard = document.querySelector('.score-board')
const snake = [21, 1, 2, 3]
const width = 20
const height = 20
const moveUp = -width
const moveDown = width
const moveLeft = -1
const moveRight = 1
let direction = moveDown
let moveIntervalID
let appleIntervalID
const numOfCells = width * height
const cellsAroundTail = [
  -width + 1,
  -width - 1,
  width + 1,
  width - 1,
  width,
  -width,
  1,
  -1
]
let score = 0

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction != moveDown) direction = moveUp
      break
    case 'ArrowDown':
      if (direction != moveUp) direction = moveDown
      break
    case 'ArrowLeft':
      if (direction != moveRight) direction = moveLeft
      break
    case 'ArrowRight':
      if (direction != moveLeft) direction = moveRight
      break
  }
})

const makeBoard = () => {
  for (let i = 0; i < 400; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    board.appendChild(cell)
  }
}

const initSnake = () => {
  snake.forEach((element) => {
    board.children[element].classList.add('snake')
  })
}

const game = () => {
  moveIntervalID = setInterval(checkNextCell, 100)
  appleIntervalID = setInterval(generateApples, 4000)
}

const checkNextCell = () => {
  if (board.children[snake[0] + direction] === undefined) return endGame()
  else if (snake[0] % width === width - 1 && direction === 1) return endGame()
  else if (snake[0] % width === 0 && direction === -1) return endGame()
  else if (board.children[snake[0] + direction].classList.contains('snake'))
    return endGame()
  moveSnake()
}

const moveSnake = () => {
  snake.unshift(snake[0] + direction)

  board.children[snake[0]].classList.add('snake')
  board.children[snake[snake.length - 1]].classList.remove('snake')
  snake.pop()
  if (checkForApple()) eatApple()
}

const checkForApple = () => {
  if (board.children[snake[0]].classList.contains('apple')) return true
  return false
}

const eatApple = () => {
  board.children[snake[0]].classList.remove('apple')
  score++
  scoreBoard.innerText = `Score: ${score}`
  console.log('apple removed')
  growTail()
}

const growTail = () => {
  let arr = []
  let aroundCell
  const snakeTailIndex = snake.length - 1
  for (let index = 0; index < 8; index++) {
    aroundCell = snake[snakeTailIndex] + cellsAroundTail[index]
    if (board.children[aroundCell] != undefined) arr.push(aroundCell)
  }
  snake.push(arr[0])
  board.children[snake[snakeTailIndex + 1]].classList.add('snake')
}

const generateApples = () => {
  let newApple = Math.floor(Math.random() * numOfCells)
  while (snake.includes(newApple))
    newApple = Math.floor(Math.random() * numOfCells)
  board.children[newApple].classList.add('apple')
}

const endGame = () => {
  clearInterval(moveIntervalID)
  clearInterval(appleIntervalID)
  console.log('game ends')
}

makeBoard()
initSnake()
generateApples()
game()
