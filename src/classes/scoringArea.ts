import P5 from "p5";
import { FieldRange } from "../interfaces/utils";
import { distanceVectors, V } from "../utils";
import Character from "./abstractCharacter";
import Beater from "./beater";
import Bludger from "./bludger";
import Chaser from "./chaser";
import Context from "./context";
import Hoop from "./hoop";
import Keeper from "./keeper";
import Quaffle from "./quaffle";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class ScoringArea extends Character {
  private width = 0
  private height = 0
  /**
   * @param p5 
   * @param rightSide true: right, false: left
   */
  constructor(p5: P5, private rightSide = false) {
    super(p5, V(0, 0))
    this.type = "scoringarea"
  }
  setContext(context: Context) {
    this.context = context
    this.load()
  }
  load() {
    let field: FieldRange = this.context?.get("field")
    this.width = field.maxX/5
    this.height = field.maxY
    if (this.rightSide) {
      this.position = V(field.maxX - this.width, field.minY)
    }
  }
  draw() {
    this.p5.push()
    this.p5.fill(116, 176, 99)
    this.p5.noStroke()
    this.p5.rect(this.position.x, this.position.y, this.width, this.height)
    this.p5.pop()
  }
  move() {}
  collide(character: Character) {
    //DoubleDispatch
    //let see if you know how to collide with me
    character.collideScoringArea(this)
  }
  collideKeeper(keeper: Keeper) {
    //i know how to collide with you
    //if im in the left side, there is an invisible wall at the end of myself
    if (!this.rightSide && keeper.getPosition().x < this.width) {
      if (this.width - keeper.getPosition().x <= keeper.getDiameter()/2) {
        keeper.setDirection("x", -keeper.getDirection().x)
      }
    }
    //if im in the right side, there is an invisible wall at the beginning of myself
    if (this.rightSide && keeper.getPosition().x > this.position.x) {
      if (Math.abs(this.position.x - keeper.getPosition().x) <= keeper.getDiameter()/2) {
        keeper.setDirection("x", -keeper.getDirection().x)
      }
    }
  }
  collideBludger(bludger: Bludger) {}
  collideQuaffle(quaffle: Quaffle) {}
  collideChaser(chaser: Chaser) {}
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}
  collideBeater(beater: Beater) {}
  collideSeeker(seeker: Seeker) {}
  collideSnitch(snitch: Snitch) {}
}