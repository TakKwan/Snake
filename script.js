const board = document.querySelector('.board')
const snake = [21, 1, 2, 3]
const width = 20
const height = 20
const moveUp = -20
const moveDown = 20
const moveLeft = -1
const moveRight = 1
let direction = moveDown

document.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (e.key === 'ArrowUp') direction = moveUp
  if (e.key === 'ArrowDown') direction = moveDown
  if (e.key === 'ArrowLeft') direction = moveLeft
  if (e.key === 'ArrowRight') direction = moveRight
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
  if (checkNextCell() === false) return
  snake.unshift(snake[0] + direction)
  board.children[snake[0]].classList.add('snake')
  board.children[snake[snake.length - 1]].classList.remove('snake')
  snake.pop()
}

const game = () => {
  let moveIntervalID = setInterval(moveSnake, 50)
}

const checkNextCell = () => {
  if (board.children[snake[0] + direction].classList.contains('snake'))
    return false
}

makeBoard()
initSnake()
game()
