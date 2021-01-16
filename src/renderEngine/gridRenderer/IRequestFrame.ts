interface FrameRequestCallback {
  (time: number): void;
}

export default interface IRequestFrame {
  requestAnimationFrame: (callback: FrameRequestCallback) => void
}