import P5, { Vector } from "p5"
import Beater from "../classes/beater"
import Chaser from "../classes/chaser"
import Keeper from "../classes/keeper"
import NullCharacter from "../classes/nullCharacter"
import NullObserver from "../classes/nullObserver"
import Seeker from "../classes/seeker"
import TeamComposite from "../classes/teamComposite"
import AbstractFactory from "../interfaces/abstractFactoryInterface"
import { RGB } from "../interfaces/utils"

export default class PlayersFactory implements AbstractFactory {
  getPlayer(p5: P5, type: string, position: Vector, members = [], colorRGB?: RGB) {
    let typeUpperCase = type.toUpperCase()
    if (typeUpperCase == "KEEPER") {
      return new Keeper(p5, position)
    }
    if (typeUpperCase == "CHASER") {
      return new Chaser(p5, position)
    }
    if (typeUpperCase == "BEATER") {
      return new Beater(p5, position)
    }
    if (typeUpperCase == "SEEKER") {
      return new Seeker(p5, position)
    }
    if (typeUpperCase == "TEAM") {
      return new TeamComposite(p5, members, colorRGB)
    }
  }
  getBall(p5,type,position){return new NullCharacter()}
  getFieldItem(p5,type,side){return new NullCharacter()}
  getObserver(p5,type,position,stringExtra) {return new NullObserver()}
}