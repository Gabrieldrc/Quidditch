import P5 from 'p5'
import Character from '../classes/abstractCharacter'
import Drawable from '../interfaces/drawableInterface'
import Game from '../interfaces/gameInterface'
import { rgb } from '../utils'
import MatchBuilder from './matchBuilder'

export default class Quidditch implements Game {
  private interactives: Character[] = []
  private drawables: Drawable[] = []
  constructor(
    private p5: P5,
    private width: number,
    private height: number,
    ){}
  loadGame() {
    this.p5.setup = () => {
      const canvas = this.p5.createCanvas(this.width, this.height)
      canvas.parent('screen')
      this.p5.frameRate(60)
      this.p5.background(10, 0, 50);
      let { interactives, drawables } = MatchBuilder.buildMath(
        this.p5,
        this.width,
        this.height,
        {name: "Ravenclaw",  color: rgb(0,0,255)},
        {name: "Hufflepuff", color: rgb(250,235,104)},
      )
      this.interactives = interactives
      this.drawables = drawables
      this.p5.background(93, 153, 99);
      this.drawables.map(element => element.draw())
    }
    document.getElementById("playQuidditchGame").addEventListener("click", () => this.play())
    document.getElementById("fs60").addEventListener("click", () => this.setFramePerSecond(60))
    document.getElementById("fs30").addEventListener("click", () => this.setFramePerSecond(30))
    document.getElementById("fs15").addEventListener("click", () => this.setFramePerSecond(15))
    document.getElementById("fs0").addEventListener("click", () => this.setFramePerSecond(0))
  }
  play() {
    this.p5.draw = () => {
      this.p5.background(93, 153, 99);
      this.interactives.map(element => element.tick())
      this.drawables.map(element => element.draw())
      for (let i = 0; i < this.interactives.length; i++) {
        for (let j = i + 1; j < this.interactives.length; j++) {
          this.interactives[i].collide(this.interactives[j])
        }        
      }
      for (let i = 0; i < this.interactives.length; i++) {
        if (this.interactives[i].getLife() <= 0) {
          let index = this.drawables.findIndex(character => character === this.interactives[i])
          this.interactives.splice(i, 1)
          this.drawables.splice(index, 1)
          i--
        }
      }
      
    }
  }
  newGame() {
    this.loadGame()
  }
  setFramePerSecond(fs: number) {
    this.p5.frameRate(fs)
  }
}