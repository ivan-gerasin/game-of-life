import {ISystemAdapter} from './index'

export default class BrowserSystemAdapter implements ISystemAdapter{
  constructor(private readonly window: Window) {}
  requestFrame(callback: FrameRequestCallback) {
    this.window.requestAnimationFrame(callback)
  }
  setInterval(callback: Function, intervalInMs: number) {
    return this.window.setInterval(callback, intervalInMs)
  }
  clearInterval(intervalId: number) {
    return this.window.clearInterval(intervalId)
  }
}