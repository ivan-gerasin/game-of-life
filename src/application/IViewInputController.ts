import {ICoordinate} from 'types'

export type ViewInputEventHandler = (pos: ICoordinate) => void

export default interface IViewInputController {
	attachHandler(handler: ViewInputEventHandler): void
	detachHandler(handlerToDetach: ViewInputEventHandler): void
}
