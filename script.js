const board = document.querySelector('.board')
const snake = [21, 1, 2, 3]

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

const moveSnake = (direction) => {
  snake.unshift(snake[0] + direction)
  board.children[snake[0]].classList.add('snake')
  board.children[snake[snake.length - 1]].classList.remove('snake')
  snake.pop()
}

makeBoard()
initSnake()
moveSnake(20)
