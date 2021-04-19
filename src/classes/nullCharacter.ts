import p5 from "p5";
import { V } from "../utils";
import abstractCharacter from "./abstractCharacter";
import Hittable from "./abstractHittable";

export default class NullCharacter extends Hittable {
  constructor(){super(new p5(()=>{}), V(0,0))}
  move() {}
  draw() {}
  collide(character: abstractCharacter) {}
}