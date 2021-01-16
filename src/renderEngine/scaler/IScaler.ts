import {ICoordinate, IRealCoordinate} from 'types'

export default interface IScaler {

  readonly scaleFactor: number
  readonly gridLineWidth: number

  scalePositionOfCell: (pos: number) => number
  scalePositionOfCellWithBorder: (pos: number) => number

  resolvePixelToCell: (pos: IRealCoordinate) => ICoordinate

}