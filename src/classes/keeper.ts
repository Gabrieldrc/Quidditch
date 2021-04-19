import p5, { Vector } from "p5";
import { distanceVectors, V } from "../utils";
import Bludger from "./bludger";
import Chaser from "./chaser";
import Quaffle from "./quaffle";
import Hittable from "../classes/abstractHittable";
import Carrier from "../interfaces/carrierInterface";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Character from "./abstractCharacter";
import Beater from "./beater";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class Keeper extends Hittable implements Carrier{
  carrying = false
  private aim = false
  constructor(
    p5: p5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 2
    this.type = "keeper"
  }
  getCarryingStatus() { return this.carrying }
  setCarryingStatus(bool: boolean) { this.carrying = bool}
  move() {
    //if is hitted is going to stop for a while
    if (this.hitted) {
      if (this.timeRemainingHitted > 0) {
        this.timeRemainingHitted--
      } else {
        this.hitted = false
        this.timeRemainingHitted = this.minTimeHitted
      }
    //if it's carrying the quaffle, it's going to throw it to the other side
    } else if (this.carrying) {
      if (!this.aim) {
        let characters: Character[] = this.context.get("teams")
        let teamMates = characters.filter(team => team.getTeammates().includes(this))
        let chasers = teamMates[0].getTeammates().filter(member => member.getType() == "chaser")
        this.pass(chasers.sort((a, b) => a.getPosition().x - b.getPosition().x)[0])
      }
    } else {
      let characters: Character[] = this.context.get("teams")
      let quaffles: Character[] = characters.filter(element => element.getType() == "quaffle")
      if (
        quaffles[0].getPosition().y > this.position.y && this.direction.y < 0
        ||
        quaffles[0].getPosition().y < this.position.y && this.direction.y > 0
        ) {
        this.direction.y = -this.direction.y
      }
      if (this.position.y == quaffles[0].getPosition().y) {
        this.position.x += this.direction.x * this.minSpeed
      } else {
        this.position.x += this.direction.x * this.minSpeed
        this.position.y += this.direction.y * this.minSpeed
      }
    }
  }
  draw() {
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.push()
    this.p5.fill(0)
    this.p5.textSize(15)
    this.p5.text(
      "k",
      this.position.x-this.diameter/4,
      this.position.y-this.diameter/4,
      this.diameter*2,
      this.diameter*2,
    )
    this.p5.pop()
  }
  collide(character: Character) {
    //DoubleDispatch
    character.collideKeeper(this)
  }
  collideKeeper(keeper: Keeper) { /*i dont collide with my type*/ }
  collideQuaffle(quaffle: Quaffle) {
    //the quaffle knows how to collide with me
    quaffle.collideKeeper(this)
  }
  collideChaser(chaser: Chaser) { /*i dont collide with a chaser yet*/ }
  collideBludger(bludger: Bludger) {
    //the bludger knows how to collide with me
    bludger.collideKeeper(this)
  }
  collideScoringArea(scoringArea: ScoringArea) {
    scoringArea.collideKeeper(this)
  }
  collideHoop(hoop: Hoop) {}
  pass(character: Character) {
    character.setRecievePass(true)
    let vector = V(character.getPosition().x - this.position.x, character.getPosition().y - this.position.y)
    this.direction = vector.normalize()
    this.aim = false
  }
  collideBeater(beater: Beater) {}
  collideSeeker(seeker: Seeker) {}
  collideSnitch(snitch: Snitch) {}
}