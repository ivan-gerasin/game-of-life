import {ICellFactory} from '../cellFactory'
import IBaseCell from './IBaseCell'

/**
 * Class and interfaces are used to test functional of an AbstractCell
 */

export type IBaseCellFactory = ICellFactory<IBaseCellFactory, IBaseCell>
