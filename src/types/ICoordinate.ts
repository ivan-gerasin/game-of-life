import {NullableNumber} from 'types/types'

// ICoordinate represent a *structure*
// So it should not have any other props and methods

export interface ICoordinate {
	readonly x: NullableNumber
	readonly y: NullableNumber
}

export interface IRealCoordinate extends ICoordinate {
	readonly x: number
	readonly y: number
}

export interface IEmptyCoordinate extends ICoordinate {
	readonly x: null
	readonly y: null
}
