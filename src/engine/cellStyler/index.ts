import CellStyler from './CellStyler'
import ICellStyler from './ICellStyler'

function rgb(r: number,g:number,b:number): string {
	return `rgb(${r},${g},${b})`
}

export {CellStyler, ICellStyler, rgb}