import AbstractCell from 'core/cell/AbstractCell'
import {ICellFactory} from '../cellFactory'
import ICell from './ICell'

/**
 * Class and interfaces are used to test functional of an AbstractCell
 */

export interface IBaseCellFactory extends ICellFactory<IBaseCellFactory, IBaseCell>{}

export interface IBaseCell extends ICell<IBaseCellFactory, IBaseCell>{}

export default class BaseCell extends AbstractCell<IBaseCellFactory, IBaseCell> implements IBaseCell {
  readonly isAlive = true
  // @ts-ignore
  nextGeneration(this: BaseCell): BaseCell {
    return this
  }
}