import Character from "../classes/abstractCharacter";

export default interface InteractiveInterface {
  move()
  collide(character: Character)
  bounce()
}