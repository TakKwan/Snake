const board = document.querySelector('.board')
const snake = [21, 1, 2, 3]
const width = 20
const height = 20
const moveUp = -width
const moveDown = width
const moveLeft = -1
const moveRight = 1
let direction = moveDown
let moveIntervalID

document.addEventListener('keydown', (e) => {
  console.log(e.key)
  switch (e.key) {
    case 'ArrowUp':
      direction = moveUp
      break
    case 'ArrowDown':
      direction = moveDown
      break
    case 'ArrowLeft':
      direction = moveLeft
      break
    case 'ArrowRight':
      direction = moveRight
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

const moveSnake = () => {
  snake.unshift(snake[0] + direction)
  board.children[snake[0]].classList.add('snake')
  board.children[snake[snake.length - 1]].classList.remove('snake')
  snake.pop()
}

const game = () => {
  moveIntervalID = setInterval(checkNextCell, 100)
}

const checkNextCell = () => {
  if (board.children[snake[0] + direction] === undefined) return endGame()
  else if (snake[0] % width === width - 1 && direction === 1) return endGame()
  else if (snake[0] % width === 0 && direction === -1) return endGame()
  else if (board.children[snake[0] + direction].classList.contains('snake'))
    return endGame()
  moveSnake()
}

const endGame = () => {
  clearInterval(moveIntervalID)
  console.log('game ends')
}

makeBoard()
initSnake()
game()
