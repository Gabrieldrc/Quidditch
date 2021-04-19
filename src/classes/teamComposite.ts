import P5 from "p5";
import { RGB } from "../interfaces/utils";
import { rgb, V } from "../utils";
import Character from "./abstractCharacter";
import Beater from "./beater";
import Bludger from "./bludger";
import Chaser from "./chaser";
import Context from "./context";
import Hoop from "./hoop";
import Keeper from "./keeper";
import Quaffle from "./quaffle";
import ScoringArea from "./scoringArea";
import Seeker from "./seeker";
import Snitch from "./snitch";

export default class TeamComposite extends Character {
  constructor(
    p5: P5,
    private members: Character[],
    colorRGB: RGB,
  ) {
    super(p5, V(0,0))
    this.type = "team"
    this.colorRGB = colorRGB
  }
  move() {this.members.map(player => player.move())}
  draw() {
    this.p5.push()
    this.p5.fill(this.colorRGB.r, this.colorRGB.g, this.colorRGB.b)
    this.members.map(player => player.draw())
    this.p5.pop()
  }
  collide(character: Character) {
    this.members.map(player => {
      character.collide(player)
    })
  }
  getTeammates(): Character[] {
    let everyone = []
    this.members.map(player => {
      everyone = everyone.concat(player.getTeammates())
    })
    return everyone
  }
  bounce() {
    this.members.map(player => {
      player.bounce()
    })
  }
  tick() {
    this.move()
    this.bounce()
  }
  setContext(context: Context) {
    this.context = context
    this.members.map(player => player.setContext(context))
  }
  collideKeeper(keeper: Keeper) {this.collide(keeper)}
  collideQuaffle(quaffle: Quaffle) {this.collide(quaffle)}
  collideChaser(chaser: Chaser) {this.collide(chaser)}
  collideBludger(bludger: Bludger) {this.collide(bludger)}
  collideScoringArea(scoringArea: ScoringArea) {this.collide(scoringArea)}
  collideHoop(hoop: Hoop) {this.collide(hoop)}
  collideBeater(beater: Beater) {this.collide(beater)}
  collideSnitch(snitch: Snitch) {this.collide(snitch)}
  collideSeeker(seeker: Seeker) {this.collide(seeker)}
}