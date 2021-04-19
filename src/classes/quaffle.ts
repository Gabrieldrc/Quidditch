import P5, { Vector } from "p5";
import { distanceVectors } from "../utils";
import Carriable from '../interfaces/carriableInterface'
import Bludger from "./bludger";
import Character from "./abstractCharacter";
import Chaser from "./chaser";
import Keeper from "./keeper";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Beater from "./beater";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class Quaffle extends Character implements Carriable {
  carrier: Keeper | Chaser = null
  private maxMoveWithKeeper = 30 * 1.5
  private moveWithKeeper = 30 * 1.5
  private freeTime = 30
  private maxFreeTime = 30
  private obtainable = true
  constructor(
    p5: P5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 6
    this.type = "quaffle"
  }
  move() {
    //if the quaffle DOES has an owner
    if (this.carrier !== null) {
      //if the carrier is not hitted
      if (!this.carrier.getHitted()) {
        //it's gonna move like the owners directions and speed
        this.position.x = this.carrier.getPosition().x
        this.position.y = this.carrier.getPosition().y
        if (this.moveWithKeeper > 0 ) {
          this.moveWithKeeper--
        } else {
          this.direction = this.carrier.getDirection().copy()
          this.carrier.setCarryingStatus(false)
          this.carrier = null
          this.moveWithKeeper = this.maxMoveWithKeeper
        }
      }
      //if NOT has an owner
    } else {
      this.position.x += this.direction.x * this.minSpeed
      this.position.y += this.direction.y * this.minSpeed
    }

    if (!this.obtainable && this.freeTime > 0 && this.carrier == null) {
      this.freeTime--
    } else if (this.freeTime <= 0 && !this.obtainable && this.carrier == null) {
      this.freeTime = this.maxFreeTime
      this.obtainable = true
    }
  }
  draw() {
    // this.position.x = this.p5.mouseX
    // this.position.y = this.p5.mouseY

    this.p5.push()
    this.p5.fill(200, 100, 100)
    this.p5.circle(this.position.x, this.position.y, this.diameter)
    this.p5.pop()
  }
  collide(character: Character) {
    //DoubleDispatch
    //let see if you know how to collide with me
    character.collideQuaffle(this)
  }
  collideQuaffle(quaffle: Quaffle) {
    //i know how to collide with my type
    if (distanceVectors(this.position, quaffle.getPosition()) <= this.diameter/2 && this.obtainable) {
      if ((this.direction.x < 0 && quaffle.getDirection().x >= 0)
        || (this.direction.x >= 0 && quaffle.getDirection().x < 0)
      ) {
        this.direction.x = -this.direction.x
        quaffle.setDirection("x", -quaffle.getDirection().x)
      }
      if ((this.direction.y < 0 && quaffle.getDirection().y >= 0)
        || (this.direction.y >= 0 && quaffle.getDirection().y < 0)
      ) {
        this.direction.y = -this.direction.y
        quaffle.setDirection("y", -quaffle.getDirection().y)
      }
    }
  }
  collideKeeper(keeper: Keeper) {
    //i know how to collide with a keeper
    this.collisionGrabbers(keeper)
  }
  collideChaser(chaser: Chaser) {
    //i know how to collide with a chaser
    this.collisionGrabbers(chaser)
  }
  collideBludger(bludger: Bludger) {
    //i know how to collide with a bludger
    //If i am near you and im available
    if (distanceVectors(this.position, bludger.getPosition()) <= this.diameter/2 
      && this.obtainable
    ) {
      if ((this.direction.x < 0 && bludger.getDirection().x >= 0)
        || (this.direction.x >= 0 && bludger.getDirection().x < 0)
      ) {
        this.direction.x = -this.direction.x
        bludger.setDirection("x", -bludger.getDirection().x)
      }
      if ((this.direction.y < 0 && bludger.getDirection().y >= 0)
        || (this.direction.y >= 0 && bludger.getDirection().y < 0)
      ) {
        this.direction.y = -this.direction.y
        bludger.setDirection("y", -bludger.getDirection().y)
      }
    }
  }
  //collision action with grabbers (players authorized to grab the quaffle)
  collisionGrabbers(character: Chaser | Keeper) {
    if (!character.getCarryingStatus()
      && distanceVectors(this.position, character.getPosition()) <= this.diameter/2 
      && this.carrier == null 
      && this.obtainable
    ) {
      this.carrier = character
      this.obtainable = false
      character.setCarryingStatus(true)
    }
  }
  collideScoringArea(scoringArea: ScoringArea) {}
  collideHoop(hoop: Hoop) {
    hoop.collideQuaffle(this)
  }
  collideBeater(beater: Beater) {}
  collideSeeker(seeker: Seeker) {}
  collideSnitch(snitch: Snitch) {}
}