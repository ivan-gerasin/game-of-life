import {IWorld, Preset} from 'core/world'
import ICellFactory from 'core/cellFactory/ICellFactory'
import {ICell} from 'core/cell'

export default interface ICellSettler<F extends ICellFactory<F, C>, C extends ICell<F,C>> {
  settle: (world: IWorld<F,C>, preset: Preset) => void
}