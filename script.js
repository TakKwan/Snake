const board = document.querySelector('.board')

const makeBoard = () => {
  for (let i = 0; i < 400; i++) {
    let one_grid = document.createElement('div')
    one_grid.classList.add('one_grid')
    board.appendChild(one_grid)
  }
}

makeBoard()
