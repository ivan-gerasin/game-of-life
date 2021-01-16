import IScaler from './IScaler'

export default class Scaler implements IScaler {
  constructor(readonly scaleFactor: number, readonly gridLineWidth: number) {
    this.halfPixelCorrectionRequired = this.isHalfPixelCorrectionRequired()
  }

  private readonly halfPixelCorrectionRequired: boolean

  private scale(pos: number) {
    return pos*(this.scaleFactor+this.gridLineWidth)
  }

  private isHalfPixelCorrectionRequired(): boolean {
    return this.gridLineWidth === 1
  }

  scalePositionOfCell(pos: number) {
    return this.scale(pos) + this.gridLineWidth
  }

  scalePositionOfCellWithBorder(pos: number) {
    const scaled = this.scale(pos)
    const HALF_PIXEL = 0.5
    //https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
    return this.halfPixelCorrectionRequired ? scaled+HALF_PIXEL : scaled
  }
}