import p5, { Vector } from "p5";
import { V } from "../utils";
import Carrier from '../interfaces/carrierInterface'
import Quaffle from "./quaffle";
import Keeper from "./keeper";
import Bludger from "./bludger";
import Hittable from "../classes/abstractHittable";
import ScoringArea from "./scoringArea";
import Hoop from "./hoop";
import Character from "./abstractCharacter";
import Beater from "./beater";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class Chaser extends Hittable implements Carrier {
  carrying = false
  private aim = false
  constructor(
    p5: p5,
    position: Vector
  ) {
    super(p5, position)
    this.diameter = 20
    this.minSpeed = 2
    this.type = "chaser"
  }
  getCarryingStatus() { return this.carrying }
  setCarryingStatus(bool: boolean) { this.carrying = bool}
  move() {
    //if is hitted it's not going to move for a while
    if (this.hitted) {
      if (this.timeRemainingHitted > 0) {
        this.timeRemainingHitted--
      } else {
        this.hitted = false
        this.timeRemainingHitted = this.minTimeHitted
      }
    //if it's carrying the quaffle
    }else if (this.carrying) {
      //it's going to aim
      if (!this.aim) {
        //find one of the enemie's hoops
        let characters: Character[] = this.context.get("teams")
        let enemies = characters.filter(team => {
          return !team.getTeammates().includes(this) && team.getType() == "team"
        })
        let hoop = enemies[0]
          .getTeammates().filter(members => members.getType() == "hoop")
          [Math.floor(Math.random() * 3)]
        //now find the chasers of your team which are between me and the enemie's hoop
        let team = characters.filter(team => team.getTeammates().includes(this))[0]
        
        let chasers = team.getTeammates().filter(member => {
          return (
            member.getType() == "chaser"
            && member != this
            && (
              member.getPosition().x < this.position.x && member.getPosition().x > hoop.getPosition().x
            ||member.getPosition().x > this.position.x && member.getPosition().x < hoop.getPosition().x
            )
          )
        })
        //if is some chaser between me and the hoops
        if (chasers.length > 0) {
          this.pass(chasers[0])
        } else {
          this.pass(hoop)
        }
      }
    } else if (this.recievePass) {
      if (this.timeReceiving > 0) {
        this.timeReceiving--
      } else {
        this.timeReceiving = this.maxTimeReceiving
        this.recievePass = false
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
      "c",
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
    character.collideChaser(this)
  }
  collideKeeper(keeper: Keeper) {
    //the keeper knows how to collide with me
    keeper.collideChaser(this)
  }
  collideQuaffle(quaffle: Quaffle) {
    //the quaffle knows how to collide with me
    quaffle.collideChaser(this)
  }
  collideChaser(chaser: Chaser) {
    //i know how to collide with my type
  }
  collideBludger(bludger: Bludger) {
    //the bludger know how to collide with me
    bludger.collideChaser(this)
  }
  collideScoringArea(scoringArea: ScoringArea) {}
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