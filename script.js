const board = document.querySelector('.board')
const scorehtml = document.querySelector('#score')
const lengthhtml = document.querySelector('#length')
const resetButton = document.querySelector('#reset')
const end_message = document.querySelector('#end_message')
const appleImg = document.createElement('img')
appleImg.src = 'red_apple.png'
appleImg.style.width = '100%'
const snake = []
const width = 30
const height = 20
const moveUp = -width
const moveDown = width
const moveLeft = -1
const moveRight = 1
const numOfCells = width * height
const cellsAroundTail = [width, -width, 1, -1]
let direction = width
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
  initSnake()
  generateApple()
  scorehtml.innerText = 'Score: 0'
  lengthhtml.innerText = 'Length: 4'
  isGameStart = false
  end_message.style.opacity = 0
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
  snake.push(3 * width + 1)
  snake.push(2 * width + 1)
  snake.push(1 + width)
  snake.push(1)
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
  removeApple()
  clearInterval(removeAppleIntervalID)
  score++
  scorehtml.innerText = `Score: ${score}`
  for (let i = 0; i < 4; i++) growTail()
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
  board.children[apple].classList.add('apple')
  board.children[apple].appendChild(appleImg)
  appleImg.style.opacity = 1

  removeAppleIntervalID = setInterval(() => {
    clearInterval(removeAppleIntervalID)
    if (apple) removeApple()
  }, 6000)
}

const endGame = () => {
  clearInterval(moveIntervalID)
  clearInterval(appleIntervalID)
  clearInterval(removeAppleIntervalID)
  end_message.style.opacity = 1
}

const removeApple = () => {
  board.children[apple].classList.remove('apple')
  appleImg.style.opacity = 0
  apple = NaN
}

makeBoard()
initSnake()
generateApple()
