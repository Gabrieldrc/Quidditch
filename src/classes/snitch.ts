import P5, { Vector } from "p5";
import { distanceVectors, vectorDirection } from "../utils";
import Character from "./abstractCharacter";
import Hittable from "./abstractHittable";
import Beater from "./beater";
import Bludger from "./bludger";
import Chaser from "./chaser";
import Hoop from "./hoop";
import Keeper from "./keeper";
import Quaffle from "./quaffle";
import ScoringArea from "./scoringArea";
import Seeker from "./seeker";

export default class Snitch extends Character{
  constructor(
    p5: P5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 15
    this.minSpeed = 6
    this.type = "snitch"
  }
  move() {
    let enemies: Character[] = []
    let teams: [Character] = this.context.get("teams")
    enemies = enemies.concat(teams.filter(character => !character.getTeammates().includes(this)))
    let enemiesList = []
    enemies.map(character => enemiesList = enemiesList.concat(character.getTeammates()))
    let result = enemiesList.filter(e => {
      return distanceVectors(e.getPosition(), this.getPosition()) < 50
    })
    if (result.length > 0) {
      let first = result[0]
      
      let collisionVector = vectorDirection(this.position, first.getPosition())
      this.direction.x = -collisionVector.x
      this.direction.y = -collisionVector.y
      
      this.position.x += this.direction.x * this.minSpeed// * 2
      this.position.y += this.direction.y * this.minSpeed// * 2
    } else {
      this.position.x += this.direction.x * this.minSpeed
      this.position.y += this.direction.y * this.minSpeed
    }
  }
  draw() {
    this.p5.push()
    this.p5.fill(255, 215, 0)
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.pop()
  }
  collide(character: Character) {
    character.collideSnitch(this)
  }
  collideBludger(bludger: Bludger) {}
  collideQuaffle(quaffle: Quaffle) {}
  collideKeeper(keeper: Keeper) {}
  collideChaser(chaser: Chaser) {}
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}
  collideBeater(beater: Beater) {}
  collideSnitch(snitch: Snitch) {}
  collideSeeker(seeker: Seeker) {
    //the seeker knows how to collide with me
    seeker.collideSnitch(this)
  }
  out() {
    //get the snitch out of the frame
    this.position.x = -100
    this.position.y = -100
    this.direction.x = 0
    this.direction.y = 0
  }
}