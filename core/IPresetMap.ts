import ICellConstructor from './cell/ICellConstructor'

export default interface IPresetMap {
  get: (key: string) => ICellConstructor
}