import ICoordinate from './ICoordinate'
import {NullableNumber} from '../src/types'

export default interface IPoint extends ICoordinate {
  readonly isEmpty: boolean
  readonly x: NullableNumber
  readonly y: NullableNumber
  readonly top: IRealPoint
  readonly bottom: IRealPoint
  readonly left: IRealPoint
  readonly right: IRealPoint
  readonly topRight: IRealPoint
  readonly topLeft: IRealPoint
  readonly bottomLeft: IRealPoint
  readonly bottomRight: IRealPoint
  same: (point: IPoint) => boolean
}

export interface IRealPoint extends IPoint {
  readonly x: number
  readonly y: number
}

export interface IEmptyPoint extends IPoint {
  readonly x: null
  readonly y: null
}