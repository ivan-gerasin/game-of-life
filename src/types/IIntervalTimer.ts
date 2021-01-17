export default interface IIntervalTimer {
  start: (intervalInMs: number, callback: () => void) => void
  stop: () => void
}