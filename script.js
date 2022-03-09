const board = document.querySelector('.board')
const scorehtml = document.querySelector('#score')
const snake = [21, 1, 2, 3]
const width = 20
const height = 20
const moveUp = -width
const moveDown = width
const moveLeft = -1
const moveRight = 1
const numOfCells = width * height
const cellsAroundTail = [width, -width, 1, -1]
let direction = 0
let moveIntervalID
let appleIntervalID
let score = 0
let apple = NaN
let isGameStart = false

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
  if (!isGameStart) {
    game()
  }
})

const makeBoard = () => {
  const maxCells = height * width
  for (let i = 0; i < maxCells; i++) {
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
  isGameStart = true
  moveIntervalID = setInterval(checkNextCell, 110)
  appleIntervalID = setInterval(() => {
    if (isNaN(apple)) generateApple()
  }, 3000)
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
  scorehtml.innerText = `Score: ${score}`
  apple = NaN
  console.log('apple removed')
  for (let i = 0; i < 2; i++) growTail()
}

const growTail = () => {
  let arr = []
  let aroundCell
  const snakeTailIndex = snake.length - 1
  for (let index = 0; index < 8; index++) {
    aroundCell = snake[snakeTailIndex] + cellsAroundTail[index]
    if (
      board.children[aroundCell] != undefined &&
      !board.children[aroundCell].classList.contains('snake')
    )
      arr.push(aroundCell)
  }
  snake.push(arr[0])
  board.children[snake[snake.length - 1]].classList.add('snake')
}

const generateApple = () => {
  let newApple
  do {
    newApple = Math.floor(Math.random() * numOfCells)
  } while (snake.includes(newApple))
  apple = newApple
  board.children[newApple].classList.add('apple')
}

const endGame = () => {
  clearInterval(moveIntervalID)
  clearInterval(appleIntervalID)
  console.log('game ends')
}

makeBoard()
initSnake()
generateApple()
