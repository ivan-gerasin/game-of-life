import ICell from '../cell/ICell'
import {IBaseCellFactory} from './IBaseCellFactory'

export default interface IBaseCell extends ICell<IBaseCellFactory, IBaseCell> {
	readonly isAlive: boolean
}
