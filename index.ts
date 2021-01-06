import Game from './core/game'

function initContext() {
  const game = new Game(window, '#canvas', 50)
  game.start()
}


declare global {
  interface Window {
    initContext: Function
  }
}

window.initContext = initContext