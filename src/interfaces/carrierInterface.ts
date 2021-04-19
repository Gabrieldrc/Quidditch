export default interface Carrier {
  carrying: boolean
  getCarryingStatus(): boolean
  setCarryingStatus(bool: boolean)
}