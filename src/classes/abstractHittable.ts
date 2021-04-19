import Character from "../classes/abstractCharacter"

export default abstract class Hittable extends Character {
  protected minTimeHitted = 60 *2 
  protected timeRemainingHitted = 60 *2 
  protected hitted = false
  getHitted() { return this.hitted }
  setHitted(bool: boolean) { this.hitted = bool }
}