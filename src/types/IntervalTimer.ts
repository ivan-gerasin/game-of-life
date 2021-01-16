import IIntervalTimer from './IIntervalTimer'
import {NullableNumber} from './types'

export default class IntervalTimer implements IIntervalTimer{
  //TODO: abstract from window

  private timerId: NullableNumber = null

  start(intervalInMs: number, callback: Function) {
    this.timerId = window.setInterval(callback, intervalInMs)
  }

  stop() {
    if (this.timerId) {
      window.clearInterval(this.timerId)
      this.timerId = null
    }
  }
}