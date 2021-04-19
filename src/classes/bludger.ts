import P5, { Vector } from "p5"
import Hittable from "../classes/abstractHittable"
import { distanceVectors } from "../utils"
import Character from "./abstractCharacter"
import Beater from "./beater"
import Chaser from "./chaser"
import Hoop from "./hoop"
import Keeper from "./keeper"
import Quaffle from "./quaffle"
import ScoringArea from "./scoringArea"
import Seeker from "./seeker"
import snitch from "./snitch"

export default class Bludger extends Character {
  constructor(
    p5: P5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 6
    this.type = "bludger"
  }
  move() {
    this.position.x += this.direction.x * this.minSpeed
    this.position.y += this.direction.y * this.minSpeed
  }
  draw() {
    this.p5.push()
    this.p5.fill(128, 62, 0)
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.pop()
  }
  collide(character: Character) {
    //DoubleDispatch
    //let see if you know how to collide with me
    character.collideBludger(this)
  }
  collideKeeper(keeper: Keeper) {
    //i know how to collide with you
    if (distanceVectors(this.position, keeper.getPosition()) <= this.diameter/2 + 2) {
      this.collisionBouncePlayers(keeper)
    }
  }
  collideQuaffle(quaffle: Quaffle) {
    //the quaffle knows how to collide with me
    quaffle.collideBludger(this)
  }
  collideBludger(bludger: Bludger) {
    //i know how to collide with my type
    if (distanceVectors(this.position, bludger.getPosition()) <= this.diameter/2 + 2) {
      this.collisionBounceObjects(bludger)
    }
  }
  collideChaser(chaser: Chaser) {
    //i know how to collide with you
    if (distanceVectors(this.position, chaser.getPosition()) <= this.diameter/2 + 2) {
      // console.log("tu te paralizas CHASER, y yo reboto")
      this.collisionBouncePlayers(chaser)
    }
  }
  //collision bounce action with objects
  collisionBounceObjects(character: Character) {
    if ((this.direction.x < 0 && character.getDirection().x >= 0)
      || (this.direction.x >= 0 && character.getDirection().x < 0)
    ) {
      this.direction.x = -this.direction.x
      character.setDirection("x", -character.getDirection().x)
    }
    if ((this.direction.y < 0 && character.getDirection().y >= 0)
      || (this.direction.y >= 0 && character.getDirection().y < 0)
    ) {
      this.direction.y = -this.direction.y
      character.setDirection("y", -character.getDirection().y)
    }
  }
  //collision bounce action with players
  collisionBouncePlayers(character: Hittable) {
    if (!character.getHitted()) {
      if ((this.direction.x < 0 && character.getDirection().x >= 0)
        || (this.direction.x >= 0 && character.getDirection().x < 0)
      ) {
        this.direction.x = -this.direction.x
      }
      if ((this.direction.y < 0 && character.getDirection().y >= 0)
        || (this.direction.y >= 0 && character.getDirection().y < 0)
      ) {
        this.direction.y = -this.direction.y
      }
      character.setHitted(true)
    }
  }
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {}
  collideBeater(beater: Beater) {
    //the Beater knows how to collide with me
    beater.collideBludger(this)
  }
  collideSeeker(seeker: Seeker) {
    if (distanceVectors(this.position, seeker.getPosition()) <= this.diameter/2 + 2) {
      // console.log("tu te paralizas CHASER, y yo reboto")
      this.collisionBouncePlayers(seeker)
    }
  }
  collideSnitch(snitch: snitch) {}
}