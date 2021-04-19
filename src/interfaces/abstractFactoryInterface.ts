import p5, { Vector } from "p5";
import Character from "../classes/abstractCharacter";
import Hittable from "../classes/abstractHittable";
import AbstractObserver from "./abstractObserverInterface";
import { RGB } from "./utils";

export default interface AbstractFactoryInterface {
  getPlayer(
    p5: p5,
    type: string,
    position: Vector,
    members?: Character[],
    rgb?: RGB,
  ): Character
  getBall(
    p5: p5,
    type: string,
    position: Vector,
  ): Character
  getFieldItem(
    p5: p5,
    type: string,
    side?: boolean,
    position?: Vector,
  ): Character
  getObserver(
    p5: p5,
    type: string,
    position: Vector,
    stringExtra?: string,
  ): AbstractObserver
}