import ICell from './cell/ICell'

export default interface IPresetMap {
  get: (key: string) => ICell
}