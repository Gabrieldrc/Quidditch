import Character from "../classes/abstractCharacter";
import Drawable from "./drawableInterface";

export default interface Match {
  interactives: Character[],
  drawables: Drawable[],
}