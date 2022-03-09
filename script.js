const board = document.querySelector('.board')
const scorehtml = document.querySelector('#score')
const lengthhtml = document.querySelector('#length')
const resetButton = document.querySelector('#reset')
const snake = [61, 41, 21, 1]
const width = 20
const height = 20
const moveUp = -width
const moveDown = width
const moveLeft = -1
const moveRight = 1
const numOfCells = width * height
const cellsAroundTail = [width, -width, 1, -1]
let direction = 0
let score = 0
let apple = NaN
let isGameStart = false
let snakeLength = 4
let appleIntervalID
let moveIntervalID
let removeAppleIntervalID

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

resetButton.addEventListener('click', () => {
  while (board.firstChild) board.removeChild(board.firstChild)
  makeBoard()
  while (snake[0]) snake.pop()
  snake.push(61)
  snake.push(41)
  snake.push(21)
  snake.push(1)
  initSnake()
  generateApple()
  scorehtml.innerText = 'Score: 0'
  lengthhtml.innerText = 'Length: 4'
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
    if (isNaN(apple)) {
      generateApple()
      removeAppleIntervalID = setInterval(() => {
        clearInterval(removeAppleIntervalID)
        if (apple) removeApple()
      }, 6000)
    }
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
  return board.children[snake[0]].classList.contains('apple')
}

const eatApple = () => {
  board.children[snake[0]].classList.remove('apple')
  apple = NaN
  clearInterval(removeAppleIntervalID)
  score++
  scorehtml.innerText = `Score: ${score}`
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
  snakeLength++
  lengthhtml.innerText = `Length: ${snakeLength}`
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
  clearInterval(removeAppleIntervalID)
}

const removeApple = () => {
  board.children[apple].classList.remove('apple')
  apple = NaN
}

makeBoard()
initSnake()
generateApple()
