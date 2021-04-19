import p5, { Vector } from "p5";
import { distanceVectors, V } from "../utils";
import Quaffle from "./quaffle";
import Keeper from "./keeper";
import Bludger from "./bludger";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Character from "./abstractCharacter";
import Chaser from "./chaser";
import Hittable from "./abstractHittable";
import Snitch from "./snitch";
import Beater from "./beater";

export default class Seeker extends Hittable {
  private minTimeToChangeDirection = 60 * 2
  private timeToChangeDirection = 60 * 2
  constructor(
    p5: p5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 4
    this.type = "seeker"
    this.point = 150
  }
  move() {
    if (this.hitted) {
      if (this.timeRemainingHitted > 0) {
        this.timeRemainingHitted--
      } else {
        this.hitted = false
        this.timeRemainingHitted = this.minTimeHitted
      }
    } else {
      this.position.x += this.direction.x * this.minSpeed
      this.position.y += this.direction.y * this.minSpeed
    }
  }
  draw() {
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.push()
    this.p5.fill(0)
    this.p5.textSize(15)
    this.p5.text(
      "s",
      this.position.x-this.diameter/4,
      this.position.y-this.diameter/4,
      this.diameter*2,
      this.diameter*2,
    )
    this.p5.pop()
  }
  collide(character: Character) {
    //DoubleDispatch
    //let see if you know how to collide with me
    character.collideSeeker(this)
  }
  collideKeeper(keeper: Keeper) {}
  collideQuaffle(quaffle: Quaffle) {}
  collideChaser(chaser: Chaser) {}
  collideBludger(bludger: Bludger) {
    //I know how to collide with a bludger
    if (distanceVectors(this.position, bludger.getPosition()) <= this.diameter/2) {
      //find an enemy chaser to throw the ball at them
      let character: Character[] = this.context.get("teams")
      let enemieTeam = character.filter(teams => !teams.getTeammates().includes(this) && teams.getType() == "team")[0]
      let enemieChasers = enemieTeam.getTeammates().filter(enemy => enemy.getType() == "chaser")
      // throw Error(enemieChasers.length.toString())
      let vectorTarget = enemieChasers[Math.floor(Math.random() * enemieChasers.length)].getPosition().copy()
      let newDirection = V(
        vectorTarget.x - bludger.getPosition().x,
        vectorTarget.y - bludger.getPosition().y
        ).normalize()
      bludger.setDirection("x", newDirection.x)
      bludger.setDirection("y", newDirection.y)
    }
  }
  collideSnitch(snitch: Snitch) {
    if (distanceVectors(snitch.getPosition(), this.position) < 5*this.diameter) {
      if (distanceVectors(snitch.getPosition(), this.position) >= this.diameter/2) {
        let newDirection = V(snitch.getPosition().x-this.position.x, snitch.getPosition().y-this.position.y).normalize()
        this.direction = newDirection.copy()
      } else {
        snitch.substractLife(snitch.getLife())
        this.notifyAllObservers()
      }
    }
  }
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}
  collideSeeker(seeker: Seeker) {}
  collideBeater(beater: Beater) {}
}