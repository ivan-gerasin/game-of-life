import {ColoredGrid} from 'types'

export default interface IColoredGridConsumer {
	consume: (grid: ColoredGrid) => void
}
