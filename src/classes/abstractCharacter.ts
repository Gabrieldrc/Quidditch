import P5, { Vector } from "p5";
import Interactive from '../interfaces/interactiveInterface'
import Drawable from '../interfaces/drawableInterface'
import Context from './context'
import { FieldRange, RGB } from "../interfaces/utils";
import AbstractObserver from "../interfaces/abstractObserverInterface";
import Bludger from "./bludger";
import Quaffle from "./quaffle";
import Keeper from "./keeper";
import Chaser from "./chaser";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Beater from "./beater";
import Snitch from "./snitch";
import Seeker from "./seeker";
import { rgb } from "../utils";

export default abstract class Character implements Interactive, Drawable{
  protected life = 1
  protected point = 0
  protected maxTimeReceiving = 60 * 2
  protected timeReceiving = 60 * 2
  protected recievePass = false
  protected diameter = 0
  protected minSpeed = 0
  protected context: Context
  protected direction: Vector
  protected observers: AbstractObserver[] = []
  protected type: string = ""
  protected colorRGB: RGB = rgb(0,255,0)
  constructor(
    protected p5: P5,
    protected position: Vector,
  ) {
    this.direction = P5.Vector.random2D()
  }
  getType(): string { return this.type }
  addObserver(observer: AbstractObserver) { this.observers.push(observer)}
  notifyAllObservers() { this.observers.map(observer => observer.update(this))}
  getDiameter() { return this.diameter }
  getPosition() { return this.position }
  getSpeed() { return this.minSpeed }
  getDirection() { return this.direction }
  getPoint() { return this.point }
  getLife() { return this.life }
  substractLife(life: number) { this.life -= life }
  setDirection(axis: string, value: number) {
    if (axis.toLowerCase() == "x" || axis.toLowerCase() == "y") {
      this.direction[axis] = value
    }
  }
  getColor() {return this.colorRGB }
  getContext() { return this.context }
  setContext(context: Context) {
    this.context = context
  }
  getTeammates(): Character[] { return [this]}
  abstract move()
  abstract draw()
  bounce() {
    let fieldRange: FieldRange = this.context.get("field")
    if (this.position.x < fieldRange.minX + this.diameter/2) {
      this.position.x = fieldRange.minX + this.diameter/2 + 2
      this.direction.x = -this.direction.x
    }
    if (this.position.x > fieldRange.maxX - this.diameter/2) {
      this.position.x = fieldRange.maxX - this.diameter/2 - 2
      this.direction.x = -this.direction.x
    }
    if (this.position.y < fieldRange.minY + this.diameter/2) {
      this.position.y = fieldRange.minY + this.diameter/2 + 2
      this.direction.y = -this.direction.y
    }
    if (this.position.y > fieldRange.maxY - this.diameter/2) {
      this.position.y = fieldRange.maxY - this.diameter/2 - 2
      this.direction.y = -this.direction.y
    }
  }
  abstract collide(character: Character)
  tick() {
    this.bounce()
    this.move()
  }
  pass(character: Character) {}
  setRecievePass(bool: boolean) { this.recievePass = bool}
  abstract collideBludger(bludger: Bludger)
  abstract collideQuaffle(quaffle: Quaffle)
  abstract collideKeeper(keeper: Keeper)
  abstract collideChaser(chaser: Chaser)
  abstract collideScoringArea(scoringArea: ScoringArea)
  abstract collideHoop(hoop: Hoop)
  abstract collideBeater(beater: Beater)
  abstract collideSnitch(snitch: Snitch)
  abstract collideSeeker(seeker: Seeker)
}