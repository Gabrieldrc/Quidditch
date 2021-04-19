import P5, { Vector } from "p5";
import NullCharacter from "../classes/nullCharacter";
import SnitchObserver from './snitchObserver'
import AbstractFactory from "../interfaces/abstractFactoryInterface";
import AbstractObserver from "../interfaces/abstractObserverInterface";
import PointOberver from "./pointObserver";

export class ObserversFactory implements AbstractFactory{
  getObserver(p5: P5, type: string, position: Vector, stringExtra = ""): AbstractObserver {
    if (type.toUpperCase() == "POINT") {
      return new PointOberver(p5, position, stringExtra)
    }
    if (type.toUpperCase() == "SNITCH") {
      return new SnitchObserver(p5, position, stringExtra)
    }
  }
  getPlayer(p5,type,position){return new NullCharacter()}
  getBall(p5,type,position){return new NullCharacter}
  getFieldItem(p5,type,side,position){return new NullCharacter()}
}