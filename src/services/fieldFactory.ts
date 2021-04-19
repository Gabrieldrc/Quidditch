import P5, { Vector } from "p5"
import Hoop from "../classes/hoop"
import NullCharacter from "../classes/nullCharacter"
import NullObserver from "../classes/nullObserver"
import ScoringArea from "../classes/scoringArea"
import AbstractFactory from "../interfaces/abstractFactoryInterface"

export default class FieldsFactory implements AbstractFactory {
  getFieldItem(p5: P5, type: string, side?: boolean, position?: Vector) {
    let typeUpperCase = type.toUpperCase()
    if (typeUpperCase == "SCORINGAREA") {
      return new ScoringArea(p5, side)
    }
    if (typeUpperCase == "HOOP") {
      return new Hoop(p5, position)
    }
  }
  getPlayer(p5,type,position) { return new NullCharacter()}
  getBall(p5,type,position) { return new NullCharacter()}
  getObserver(p5,type,position,stringExtra) {return new NullObserver()}
}