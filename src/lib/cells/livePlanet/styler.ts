import {
	EmptyCell,
	Plant,
	ILivePlanetCell,
	ILivePlanetCellFactory,
	Water
} from './index'
import {CellStyler, ICellStyler, rgb} from 'engine/cellStyler'
import Predator from './Predator'
import Herbivore from './Herbivore'

const styleMap = {
	[EmptyCell.name]: rgb(255, 255, 255),
	[Plant.name]: rgb(0, 255, 0),
	[Water.name]: rgb(0, 0, 255),
	[Herbivore.name]: rgb(255, 255, 0),
	[Predator.name]: rgb(255, 0, 0)
}

const styler: ICellStyler<
	ILivePlanetCellFactory,
	ILivePlanetCell
> = CellStyler.fromObject(styleMap)
export default styler
