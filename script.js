const board = document.querySelector('.board')
const cells = board.children
const scorehtml = document.querySelector('#score')
const lengthhtml = document.querySelector('#length')
const resetButton = document.querySelector('#reset')
const end_message = document.querySelector('#end_message')
const appleImg = document.createElement('img')
appleImg.src = 'red_apple.png'
appleImg.style.width = '100%'
const snakeHead = document.createElement('img')
snakeHead.src = 'snakeImg/headDown.png'
snakeHead.style.width = '100%'
const storeApple = document.createElement('div')
const snake = []
const width = 30
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
let snakeLength = 1
let appleIntervalID
let moveIntervalID
let removeAppleIntervalID

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction != moveDown) {
        direction = moveUp
        snakeHead.src = 'snakeImg/headUp.png'
      }
      break
    case 'ArrowDown':
      if (direction != moveUp) {
        direction = moveDown
        snakeHead.src = 'snakeImg/headDown.png'
      }
      break
    case 'ArrowLeft':
      if (direction != moveRight) {
        direction = moveLeft
        snakeHead.src = 'snakeImg/headLeft.png'
      }
      break
    case 'ArrowRight':
      if (direction != moveLeft) {
        direction = moveRight
        snakeHead.src = 'snakeImg/headRight.png'
      }
      break
  }
  if (!isGameStart) {
    game()
  }
})

resetButton.addEventListener('click', () => {
  score = 0
  snakeLength = 1
  snakeHead.src = 'snakeImg/headDown.png'
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
  direction = snake[0] < (width * height) / 2 ? moveDown : moveUp
  for (let i = 0; i < 3; i++) grow()
  snake.forEach((element) => {
    cells[element].classList.add('snake')
  })
  cells[snake[0]].appendChild(snakeHead)
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
  if (cells[snake[0] + direction] === undefined) return endGame()
  else if (snake[0] % width === width - 1 && direction === 1) return endGame()
  else if (snake[0] % width === 0 && direction === -1) return endGame()
  else if (snake.includes(snake[0] + direction)) return endGame()
  if (checkForApple()) eatApple()
  moveSnake()
}

const moveSnake = () => {
  snake.unshift(snake[0] + direction)
  cells[snake[0]].classList.add('snake')
  cells[snake[snake.length - 1]].classList.remove('snake')
  cells[snake[0]].appendChild(snakeHead)
  cells[snake[1]].appendChild(cells[snake[snake.length - 1]].childNodes[0])
  snake.pop()
  cells[snake[1]].children[0].src = getBodySrc(1)
  correctTailImg()
}

const checkForApple = () => {
  return cells[snake[0]].classList.contains('apple')
}

const eatApple = () => {
  removeApple()
  clearInterval(removeAppleIntervalID)
  score++
  scorehtml.innerText = `Score: ${score}`
  for (let i = 0; i < 4; i++) grow()
  for (let i = 0; i < snake.length - 1; i++) cells[snake[i]].src = getBodySrc(i)
  correctTailImg()
}

const grow = () => {
  let arr = []
  let aroundCell
  let src
  const snakeTailIndex = snake.length - 1
  for (let index = 0; index < 4; index++) {
    aroundCell = snake[snakeTailIndex] + cellsAroundTail[index]
    if (
      cells[aroundCell] != undefined &&
      snake[0] + direction != aroundCell &&
      !snake.includes(aroundCell)
    )
      arr.push(aroundCell)
  }
  snake.push(arr[0])
  cells[snake[snake.length - 1]].classList.add('snake')

  const newBody = document.createElement('img')
  if ((arr[0] - snake[snake.length - 1]) % width === 0)
    src = 'snakeImg/moveVertical.png'
  else src = 'snakeImg/moveHorizontel.png'

  newBody.src = src
  cells[snake[snake.length - 1]].appendChild(newBody)
  newBody.style.width = '100%'

  snakeLength++
  lengthhtml.innerText = `Length: ${snakeLength}`
}

const generateApple = () => {
  let newApple
  do {
    newApple = Math.floor(Math.random() * numOfCells)
  } while (snake.includes(newApple))
  apple = newApple
  cells[apple].classList.add('apple')
  cells[apple].appendChild(appleImg)
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
  cells[apple].classList.remove('apple')
  appleImg.style.opacity = 0
  apple = NaN
  storeApple.appendChild(appleImg)
}

const getBodySrc = (i) => {
  const verticalSrc = 'snakeImg/moveVertical.png'
  const horizontelSrc = 'snakeImg/moveHorizontel.png'
  const downRight = 'snakeImg/turnDownRight.png'
  const downLeft = 'snakeImg/turnDownLeft.png'
  const upRight = 'snakeImg/turnUpRight.png'
  const upLeft = 'snakeImg/turnUpLeft.png'

  if (snake[i - 1] === snake[i] + width && snake[i] === snake[i + 1] + width)
    return verticalSrc
  else if (snake[0] === snake[i] + width && snake[i] === snake[i + i] + 1)
    return upLeft
  else if (snake[0] === snake[i] + width && snake[i] === snake[i + 1] - 1)
    return upRight
  else if (snake[0] === snake[i] - width && snake[i] === snake[i + 1] - width)
    return verticalSrc
  else if (snake[0] === snake[i] - width && snake[i] === snake[i + 1] + 1)
    return downLeft
  else if (snake[0] === snake[i] - width && snake[i] === snake[i + 1] - 1)
    return downRight
  else if (snake[0] === snake[i] + 1 && snake[i] === snake[i + 1] + 1)
    return horizontelSrc
  else if (snake[0] === snake[i] + 1 && snake[i] === snake[i + 1] + width)
    return downRight
  else if (snake[0] === snake[i] + 1 && snake[i] === snake[i + 1] - width)
    return upRight
  else if (snake[0] === snake[i] - 1 && snake[i] === snake[i + 1] - 1)
    return horizontelSrc
  else if (snake[0] === snake[i] - 1 && snake[i] === snake[i + 1] + width)
    return downLeft
  else if (snake[0] === snake[i] - 1 && snake[i] === snake[i + 1] - width)
    return upLeft
}

const correctTailImg = () => {
  const velocity = snake[snake.length - 2] - snake[snake.length - 1]
  if (velocity === width)
    cells[snake[snake.length - 1]].children[0].src = 'snakeImg/tailUp.png'
  else if (-velocity === width)
    cells[snake[snake.length - 1]].children[0].src = 'snakeImg/tailDown.png'
  else if (velocity === 1)
    cells[snake[snake.length - 1]].children[0].src = 'snakeImg/tailLeft.png'
  else if (-velocity === -1)
    cells[snake[snake.length - 1]].children[0].src = 'snakeImg/tailRight.png'
}

makeBoard()
initSnake()
generateApple()
