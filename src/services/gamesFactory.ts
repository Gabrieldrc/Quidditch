import p5 from "p5";
import Game from "../interfaces/gameInterface"
import FactoryProducer from "./factoryProducer";
import Quidditch from './quidditch'

export default class GamesFactory {
  static getGame(type: string): Game {
    let game: Game
    if (type.toUpperCase() == "QUIDDITCH") {
      game = new Quidditch(new p5(()=>{}), 1400, 700)
      game.loadGame()
      return game
    }
  }
}