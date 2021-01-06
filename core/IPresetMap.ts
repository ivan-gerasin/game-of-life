import {ICellConstructor} from './cell'

export default interface IPresetMap {
  get: (key: string) => ICellConstructor
}