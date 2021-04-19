import p5, { Vector } from "p5";
import Bludger from "../classes/bludger";
import NullCharacter from "../classes/nullCharacter";
import Quaffle from "../classes/quaffle";
import Snitch from "../classes/snitch";
import AbstractFactory from "../interfaces/abstractFactoryInterface";
import NullObserver from '../classes/nullObserver'

export default class BallsFactory implements AbstractFactory{
  getBall(p5: p5, type: string, position: Vector) {
    let typeUpperCase = type.toUpperCase()
    if (typeUpperCase == "QUAFFLE") {
      return new Quaffle(p5, position)
    }
    if (typeUpperCase == "BLUDGER") {
      return new Bludger(p5, position)
    }
    if (typeUpperCase == "SNITCH") {
      return new Snitch(p5, position)
    }
  }
  getPlayer(p5,type,position) {return new NullCharacter()}
  getFieldItem(p5,type,side) {return new NullCharacter()}
  getObserver(p5,type,position,stringExtra) {return new NullObserver()}
}