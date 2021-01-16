import {ColoredGrid} from 'types'

export default interface IViewController {
  requestRender: (styledGrid: ColoredGrid) => void
}