import IBaseCell from './IBaseCell'
import {IBaseCellFactory} from './IBaseCellFactory'
import BaseEmptyCell from './BaseEmptyCell'
import BaseCell from './BaseCell'

import {IWorld} from 'core/world'
import {ICellConstructor} from 'core/cell'
import {Nullable} from 'types/types'

type BaseWorld = IWorld<IBaseCellFactory, IBaseCell>
type BaseCellConstructor = ICellConstructor<IBaseCellFactory, IBaseCell>

export default class ClassicCellFactory implements IBaseCellFactory {
	private world: Nullable<BaseWorld> = null

	private create(Cons: BaseCellConstructor): IBaseCell {
		if (this.world) {
			return new Cons(this.world)
		}
		throw new ReferenceError(
			'ClassicCellFactory does not attached to the world'
		)
	}

	attachWorld(world: BaseWorld): void {
		this.world = world
	}

	empty(): IBaseCell {
		return this.create(BaseEmptyCell)
	}

	alive(): IBaseCell {
		return this.create(BaseCell)
	}
}
