import {ICell} from '../cell'

export default interface ICellStyler {
  getStyleFor: (cellInstance: ICell) => string
}