import ICell from './cell/ICell'

export default interface ICellStyler {
  getStyleFor: (cellInstance: ICell) => string
}