import {ColoredGrid} from 'types'

export default interface IViewRenderingController {
  requestRender: (styledGrid: ColoredGrid) => void
}