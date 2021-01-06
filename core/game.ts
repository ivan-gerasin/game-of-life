import {TimerId} from '../src/types'

import World from './world'
import IGlobal from './IGlobal'
import CellStyler from './cellStyler'
import GridRenderer from './gridRenderer'

// TODO: just for dev/testing, should not be here
const presets = require('../lib/presets')

export default class Game {
  private world
  private renderer
  private global: IGlobal
  private timer: TimerId = null

  interval = 200
  running = false

  constructor(globalObject: IGlobal, canvasSelector: string, size: number) {
    const canvas = <HTMLCanvasElement>globalObject.document.querySelector(canvasSelector)
    if (canvas === null) {
      // TODO: we should provide context itself - to know as less as possible about IGlobal
      throw ReferenceError('Canvas not found')
    }
    const context = canvas.getContext('2d')
    if (context === null) {
      throw ReferenceError('Context not found')
    }
    this.global = globalObject
    this.world = World.buildWithPreset(presets.pulsar, size)
    this.renderer = new GridRenderer(context, CellStyler.defaultStyler(), 10)
  }

  start() {
    this.running = true
    this.timer = this.global.setInterval(() => {
      this.global.requestAnimationFrame(() => {
        const grid = this.world.exportGrid()
        this.renderer.render(grid)
        this.world.nextGeneration()
        console.log('tick')
      })
    }, this.interval)
  }

  stop() {
    if (this.timer) {
      this.running = false
      this.global.clearInterval(this.timer)
      this.timer = null
    }
  }

}
