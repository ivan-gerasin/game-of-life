import AbstractCell from 'core/cell/AbstractCell'
import IBaseCell from './IBaseCell'
import {IBaseCellFactory} from './IBaseCellFactory'

export default class BaseEmptyCell
	extends AbstractCell<IBaseCellFactory, IBaseCell>
	implements IBaseCell {
	readonly isAlive = true
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	nextGeneration(this: BaseEmptyCell): BaseEmptyCell {
		return this
	}
}
