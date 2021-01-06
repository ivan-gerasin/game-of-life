import {ICell} from '../cell'

export default interface IGridRenderer {
  readonly dotSize: number
  scalePosition: (position: number) => number
  putDot: (x: number, y:number, color: string) => void
  render: (grid: ICell[][]) => void
}