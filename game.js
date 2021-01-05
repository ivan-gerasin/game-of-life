const World = require('./world')
const Renderer = require('./gridRenderer')

class Game {
  #world
  #renderer
  #global
  #timer

  interval = 100
  running = false

  constructor(globalObject, canvasSelector, size) {
    const canvas = globalObject.document.querySelector(canvasSelector)
    const context = canvas.getContext('2d')
    this.#global = globalObject
    const preset = [
      'xxxx@',
      'xxxxx@',
      'xxx@@@'
    ]
    this.#world = World.buildWithPreset(preset, size)
    this.#renderer = new Renderer(context, size, 10)
  }

  start() {
    this.running = true
    this.#timer = this.#global.setInterval(() => {
      this.#global.requestAnimationFrame(() => {
        const grid = this.#world.exportGrid()
        this.#renderer.render(grid)
        this.#world.nextGeneration()
        console.log('tick')
      })
    }, this.interval)
  }

  stop() {
    this.running = false
    this.#global.clearInterval(this.#timer)
    this.#timer = null
  }

}

module.exports = Game