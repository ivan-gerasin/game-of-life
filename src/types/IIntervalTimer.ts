export default interface IIntervalTimer {
  start: (intervalInMs: number, callback: Function) => void
  stop: () => void
}