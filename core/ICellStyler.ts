import ICell from './ICell'

export default interface ICellStyler {
  getStyleFor: (cellInstance: ICell) => string
}