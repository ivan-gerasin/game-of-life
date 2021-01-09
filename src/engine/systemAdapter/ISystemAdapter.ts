
interface FrameRequestCallback {
  (time: number): void;
}

export default interface ISystemAdapter {
  requestFrame: (callback: FrameRequestCallback) => void
  setInterval: (callback: Function, intervalInMs: number) => number
  clearInterval: (intervalId: number) => void
}