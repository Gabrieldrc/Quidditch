import P5, { Vector } from "p5";
import Character from "../classes/abstractCharacter";
import AbstractObserver from "../interfaces/abstractObserverInterface";
import DrawableInterface from "../interfaces/drawableInterface";

export default class SnitchObserver implements AbstractObserver, DrawableInterface{
  private snitchCatched = false
  private timeShowing = 400
  private points = 0
  constructor(
    private p5: P5,
    private position: Vector,
    private teamName = "",
  ){}
  update(character: Character) {
    this.snitchCatched = true
    this.points = character.getPoint()
  }
  draw() {
    if (this.snitchCatched && this.timeShowing > 0) {
      this.p5.push()
      this.p5.textSize(24)
      this.p5.text(`The snitch was catched, ${this.points} point to ${this.teamName}`, this.position.x, this.position.y)
      this.p5.pop()
      this.timeShowing--
    }
  }
  
}