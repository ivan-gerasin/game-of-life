export type CanvasClickHandler = (x: number, y: number) => void

export default class CanvasEventListener {
  constructor(private readonly canvasElement: HTMLCanvasElement, private handlers: CanvasClickHandler[] = []) {
    if (handlers.length) {
      this.addEventListener()
    }
  }

  private addEventListener() {
    this.canvasElement.addEventListener('click', this.listener.bind(this))
  }

  private removeEventListener() {
    this.canvasElement.removeEventListener('click', this.listener.bind(this))
  }

  attachHandler(handler: CanvasClickHandler) {
    if (this.handlers.length === 0) {
      this.addEventListener()
    }
    if (this.handlers.includes(handler)) {
      return
    }
    this.handlers.push(handler)
  }

  detachHandler(handlerToDetach: CanvasClickHandler) {
    if (!this.handlers.includes(handlerToDetach)) {
      return
    }
    this.handlers = this.handlers.filter(handler => handlerToDetach !== handler)
    if (this.handlers.length === 0) {
      this.removeEventListener()
    }
  }

  listener(event: MouseEvent) {
    const {offsetX: x, offsetY: y} = event
    this.handlers.forEach(handler => handler(x,y))
  }

}