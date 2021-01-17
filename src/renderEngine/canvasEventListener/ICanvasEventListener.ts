import {ICoordinate} from 'types'

export type CanvasClickHandler = (pos: ICoordinate) => void

export default interface ICanvasEventListener {
  attachHandler(handler: CanvasClickHandler): void

  detachHandler(handlerToDetach: CanvasClickHandler): void
}