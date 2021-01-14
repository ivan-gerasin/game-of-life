import {IRealCoordinate} from 'types/ICoordinate'

export default interface IGridRenderer {
  readonly dotSize: number
  scalePosition: (position: number) => number
  scalePositionWithGrid: (y:number, color: string) => void
  resolveCanvasCoordinateToPosition: (x: number, y: number) => IRealCoordinate
  render: (grid: string[][]) => void
}