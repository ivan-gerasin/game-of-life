import AbstractCell from 'core/cell/AbstractCell'
import IBaseCell from './IBaseCell'
import {IBaseCellFactory} from './IBaseCellFactory'

export default class BaseCell
	extends AbstractCell<IBaseCellFactory, IBaseCell>
	implements IBaseCell {
	readonly isAlive = true
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	nextGeneration(this: BaseCell): BaseCell {
		return this
	}
}
