import {Cell, DeadCell, IClassicCell, IClassicCellFactory} from './index'
import {CellStyler, ICellStyler, rgb} from 'engine/cellStyler'

const blackWhiteStyleMap = {
	[Cell.name]: rgb(0, 0, 0),
	[DeadCell.name]: rgb(255, 255, 255)
}

const styler: ICellStyler<
	IClassicCellFactory,
	IClassicCell
> = CellStyler.fromObject(blackWhiteStyleMap)
export default styler
