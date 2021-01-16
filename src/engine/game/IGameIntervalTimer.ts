export default interface IGameIntervalTimer {
  start: (intervalInMs: number, callback: Function) => void
  stop: (intervalId: number) => void
}