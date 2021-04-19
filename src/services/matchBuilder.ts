import P5 from 'p5'
import Character from '../classes/abstractCharacter'
import Context from '../classes/context'
import Match from '../interfaces/matchInterface'
import { teamData } from '../interfaces/utils'
import { fieldRange, V, rgb } from '../utils'
import FactoryProducer from './factoryProducer'

export default class MatchBuilder {
  static buildMath(p5: P5, widthfield: number, heightField: number, team1: teamData, team2: teamData): Match {
    let interactives = []
    let drawables = []
    let playersFactory = FactoryProducer.getFactory("players")
    let ballsFactory   = FactoryProducer.getFactory("balls")
    let fieldFactory   = FactoryProducer.getFactory("field")
    let observerFactory= FactoryProducer.getFactory("observer")
    /**
     * team1 are at the right side of the field
     * team2 are at the left side of the field
     * 
     * order to work:
     *  - interactives:
     *    - scoringarea(s)
     *    - balls(s)
     *    - team(s)
     *  - drawables:
     *    - scoringarea(s)
     *    - ball(s)
     *    - team(s)
     *    - observer(s)
     * 
     *  The Pointer Observer of the team1(right) 
     *  should be observing the team2(left)'s hoops,
     *  and vice-versa
     */
    let scoringAreas = []
    scoringAreas.push(fieldFactory.getFieldItem(p5, "scoringarea", false, null))
    scoringAreas.push(fieldFactory.getFieldItem(p5, "scoringarea", true, null))
    scoringAreas.map(character => interactives.push(character))
    scoringAreas.map(character => drawables.push(character))
    //scoring areas added to interactives and drawables

    let team1Right: Character[] = []
    team1Right.push(fieldFactory.getFieldItem(p5, "hoop", true, V(widthfield - widthfield/10, heightField/2)))
    team1Right.push(fieldFactory.getFieldItem(p5, "hoop", true, V(widthfield - widthfield/10, heightField/2 - heightField/6)))
    team1Right.push(fieldFactory.getFieldItem(p5, "hoop", true, V(widthfield - widthfield/10, heightField/2 + heightField/6)))

    let team2Left: Character[] = []
    team2Left.push(fieldFactory.getFieldItem(p5, "hoop", false, V(widthfield/10, heightField/2)))
    team2Left.push(fieldFactory.getFieldItem(p5, "hoop", false, V(widthfield/10, heightField/2 - heightField/6)))
    team2Left.push(fieldFactory.getFieldItem(p5, "hoop", false, V(widthfield/10, heightField/2 + heightField/6)))

    let observers = []
    //Team 1 (right) observer observing team 2 (left) hoops
    let pointObserverTeam1 = observerFactory.getObserver(p5, "point", V(widthfield/2,24), team1.name)
    let snitchObserverTeam1 = observerFactory.getObserver(p5, "snitch", V(0, heightField), team1.name)
    let pointObserverTeam2 = observerFactory.getObserver(p5, "point", V(0,24), team2.name)
    let snitchObserverTeam2 = observerFactory.getObserver(p5, "snitch", V(0, heightField), team2.name)
    //right now in both teams are just hoops, so first it'll be added their observers
    team2Left.map(character => character.addObserver(pointObserverTeam1))
    team1Right.map(character => character.addObserver(pointObserverTeam2))
    //pointObservers setted to their hoops
    observers.push(pointObserverTeam1)
    observers.push(snitchObserverTeam1)
    observers.push(pointObserverTeam2)
    observers.push(snitchObserverTeam2)

    let balls = []
    balls.push(ballsFactory.getBall(p5, "bludger", V(widthfield/2, heightField/2 + heightField/6)))
    balls.push(ballsFactory.getBall(p5, "bludger", V(widthfield/2, heightField/2 - heightField/6)))
    balls.push(ballsFactory.getBall(p5, "quaffle", V(widthfield/2, heightField/2)))
    balls.push(ballsFactory.getBall(p5, "snitch",  V(widthfield/2, 10)))

    balls.map(character => interactives.push(character))
    balls.map(character => drawables.push(character))
    //balls added to interactives and drawables

    team1Right.push(playersFactory.getPlayer(p5, "chaser", V(widthfield - widthfield/4, heightField/2)))
    team1Right.push(playersFactory.getPlayer(p5, "chaser", V(widthfield - widthfield/4, heightField/4)))
    team1Right.push(playersFactory.getPlayer(p5, "chaser", V(widthfield - widthfield/4, heightField*3/4)))
    team1Right.push(playersFactory.getPlayer(p5, "beater", V(widthfield - widthfield/10 - 50, heightField/3)))
    team1Right.push(playersFactory.getPlayer(p5, "beater", V(widthfield - widthfield/10 - 50, heightField*2/3)))
    team1Right.push(playersFactory.getPlayer(p5, "keeper", V(widthfield - widthfield/10 + 50, heightField/2)))
    let seeker1 = playersFactory.getPlayer(p5, "seeker", V(widthfield/2 + 50, heightField - 50))
    seeker1.addObserver(pointObserverTeam1)
    seeker1.addObserver(snitchObserverTeam1)
    team1Right.push(seeker1)


    team2Left.push(playersFactory.getPlayer(p5, "chaser", V(widthfield/4, heightField/2)))
    team2Left.push(playersFactory.getPlayer(p5, "chaser", V(widthfield/4, heightField/4)))
    team2Left.push(playersFactory.getPlayer(p5, "chaser", V(widthfield/4, heightField*3/4)))
    team2Left.push(playersFactory.getPlayer(p5, "beater", V(widthfield/10 + 50, heightField/3)))
    team2Left.push(playersFactory.getPlayer(p5, "beater", V(widthfield/10 + 50, heightField*2/3)))
    team2Left.push(playersFactory.getPlayer(p5, "keeper", V(widthfield/10 - 50, heightField/2)))
    let seeker2 = playersFactory.getPlayer(p5, "seeker", V(widthfield/2 - 50, heightField - 50))
    seeker2.addObserver(pointObserverTeam2)
    seeker2.addObserver(snitchObserverTeam2)
    team2Left.push(seeker2)

    let team1Composite = playersFactory.getPlayer(p5, "team", V(0,0), team1Right, team1.color)
    let team2Composite = playersFactory.getPlayer(p5, "team", V(0,0), team2Left, team2.color)
    interactives.push(team1Composite, team2Composite)
    drawables.push(team1Composite, team2Composite)
    //teams added to interactives and drawables

    observers.map(observer => drawables.push(observer))
    //Now we create a context and add the "field" and "teams" properties
    let context = new Context()
    context.set("field", fieldRange(widthfield, heightField))
    context.set("teams", interactives)
    //we set this context to every interactive object
    interactives.map(element => element.setContext(context))
    return {
      interactives: interactives,
      drawables: drawables,
    }
  }
}