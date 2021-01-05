const World = require('./world')
const Renderer = require('./gridRenderer')
const CellStyler = require('./cellStyler')
const PresetMap = require('./presetMap')

const {glider} = require('./presets')

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
    this.#world = World.buildWithPreset(glider, size)
    this.#renderer = new Renderer(context, CellStyler.defaultStyler(), 10)
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