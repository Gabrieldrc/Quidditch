import AbstractFactory from "../interfaces/abstractFactoryInterface";
import BallsFactory from "./ballsFactory";
import FieldsFactory from "./fieldFactory";
import { ObserversFactory } from "./observersFactory";
import PlayersFactory from "./playersFactory";

export default class FactoryProducer {
  static getFactory(type: string): AbstractFactory {
    let typeUpper = type.toUpperCase()
    if (typeUpper == "BALLS") {
      return new BallsFactory()
    }
    if (typeUpper == "PLAYERS") {
      return new PlayersFactory()
    }
    if (typeUpper == "FIELD") {
      return new FieldsFactory()
    }
    if (typeUpper == "OBSERVER") {
      return new ObserversFactory()
    }
  }
}