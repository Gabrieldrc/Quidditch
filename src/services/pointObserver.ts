import P5, { Vector } from "p5";
import Character from "../classes/abstractCharacter";
import TeamComposite from "../classes/teamComposite";
import AbstractObserver from "../interfaces/abstractObserverInterface";
import DrawableInterface from "../interfaces/drawableInterface";
import { FieldRange, RGB } from "../interfaces/utils";

export default class PointOberver implements AbstractObserver, DrawableInterface{
  private points = 0
  private color: RGB
  constructor(
    private p5: P5,
    private position: Vector,
    private teamName = "",
  ){}
  update(character: Character) {
    this.points += character.getPoint()
    if (this.points >= 200) {
      let teams: Character[] = character.getContext().get("teams")
      let team = teams.filter(team => !team.getTeammates().includes(character))[0]
      this.color = team.getColor()
      let fieldRange: FieldRange = character.getContext().get("field")
      this.position.x = fieldRange.maxX/3
      this.position.y = fieldRange.maxY/3
    }
  }
  draw() {
    if (this.points >= 200) {
      this.p5.push()
      this.p5.fill(this.color.r, this.color.g, this.color.b)
      this.p5.textSize(48)
      this.p5.text(`${this.teamName} Won!`, this.position.x, this.position.y)
      this.p5.pop()
      this.p5.frameRate(0)
    } else {
      this.p5.push()
      this.p5.textSize(24)
      this.p5.text(`${this.teamName}: ${this.points}`, this.position.x, this.position.y)
      this.p5.pop()
    }
  }
}