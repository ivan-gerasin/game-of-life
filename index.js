const Game = require('./core/game')

window.context = null


function initContext() {
  const game = new Game(window, '#canvas', 50)
  game.start()
}

window.initContext = initContext