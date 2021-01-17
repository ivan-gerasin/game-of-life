import {ISystemAdapter} from './index'

export default class BrowserSystemAdapter implements ISystemAdapter {
	constructor(private readonly window: Window) {}
	requestFrame(callback: FrameRequestCallback): void {
		this.window.requestAnimationFrame(callback)
	}
	setInterval(callback: () => void, intervalInMs: number): number {
		return this.window.setInterval(callback, intervalInMs)
	}
	clearInterval(intervalId: number): void {
		return this.window.clearInterval(intervalId)
	}
}
