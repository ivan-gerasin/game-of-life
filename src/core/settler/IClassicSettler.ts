import ISettler, {SettlerMethod} from './ISettler'

export default interface IClassicSettler extends ISettler<IClassicSettler> {
  alive: SettlerMethod<IClassicSettler>
}