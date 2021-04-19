import P5, { Vector } from "p5";
import { distanceVectors, V } from "../utils";
import Character from "./abstractCharacter";
import Beater from "./beater";
import Bludger from "./bludger";
import Chaser from "./chaser";
import Keeper from "./keeper";
import Quaffle from "./quaffle";
import ScoringArea from "./scoringArea";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class Hoop extends Character {
  private minTimeToMakeAnotherPoint = 60 * 4
  private timeToMakeAnotherPoint = 60 * 4
  private madeAPoint = false
  constructor(p5: P5, position: Vector) {
    super(p5, position)
    this.diameter = 60
    this.type = "hoop"
    this.point = 10
  }
  move() {}
  draw() {
    if (this.madeAPoint) {
      this.timeToMakeAnotherPoint--
      // console.log(this.timeToMakeAnotherPoint)
    }
    if (this.madeAPoint && this.timeToMakeAnotherPoint <= 0) {
      this.madeAPoint = false
      this.timeToMakeAnotherPoint = this.minTimeToMakeAnotherPoint
      // console.log(this.madeAPoint)
    }
    this.p5.push()
    this.p5.fill(0, 0.5)
    this.p5.ellipse(this.position.x, this.position.y, 10, this.diameter)
    this.p5.pop()
  }
  collide(character: Character) {
    character.collideHoop(this)
  }
  collideBludger(bludger: Bludger) {}
  collideQuaffle(quaffle: Quaffle) {
    //if the distance of quaffle center en this is equal or less than the quaffle radius
    if (
        (//If y axis quaffle borders are between this y axis borders
          this.position.y - this.diameter/2 < quaffle.getPosition().y - quaffle.getDiameter()/2
        &&this.position.y + this.diameter/2 > quaffle.getPosition().y + quaffle.getDiameter()/2
        )
      &&
        (//If quaffle x axis is close to hoop x axis
          Math.abs(this.position.x - quaffle.getPosition().x) <= quaffle.getDiameter()/2
        )
      && !this.madeAPoint
    ) {

      this.notifyAllObservers()
      this.madeAPoint = true
    }
    
    this.cornersBounce(quaffle)
  }
  collideKeeper(keeper: Keeper) {}
  collideChaser(chaser: Chaser) {}
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}

  cornersBounce(character: Character) {
    if (
      distanceVectors(V(this.position.x, this.position.y - this.diameter/2),
        character.getPosition()) <= character.getDiameter()/2
      ||
      distanceVectors(V(this.position.x, this.position.y + this.diameter/2),
        character.getPosition()) <= character.getDiameter()/2
    ) {
      character.setDirection("x", -character.getDirection().x)
      character.setDirection("y", -character.getDirection().y)
    }
  }
  collideBeater(beater: Beater) {}
  collideSeeker(seeker: Seeker) {}
  collideSnitch(snitch: Snitch) {}
}