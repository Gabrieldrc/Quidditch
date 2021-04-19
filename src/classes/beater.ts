import p5, { Vector } from "p5";
import { distanceVectors, V } from "../utils";
import Quaffle from "./quaffle";
import Keeper from "./keeper";
import Bludger from "./bludger";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Character from "./abstractCharacter";
import Chaser from "./chaser";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class Beater extends Character {
  constructor(
    p5: p5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 2
    this.type = "beater"
  }
  move() {
    this.position.x += this.direction.x * this.minSpeed
    this.position.y += this.direction.y * this.minSpeed
  }
  draw() {
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.push()
    this.p5.fill(0)
    this.p5.textSize(15)
    this.p5.text(
      "b",
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
    character.collideBeater(this)
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
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}
  collideBeater(beater: Beater) {}
  collideSeeker(seeker: Seeker) {}
  collideSnitch(snitch: Snitch) {}
}