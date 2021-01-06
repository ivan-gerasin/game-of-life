import ICell from './ICell'

export default interface IPresetMap {
  get: (key: string) => ICell
}