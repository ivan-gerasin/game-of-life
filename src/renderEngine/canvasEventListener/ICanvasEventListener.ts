export type CanvasClickHandler = (x: number, y: number) => void

export default interface ICanvasEventListener {
  attachHandler(handler: CanvasClickHandler): void

  detachHandler(handlerToDetach: CanvasClickHandler): void
}