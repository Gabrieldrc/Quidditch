import P5, {Vector} from 'p5'
import { FieldRange, RGB } from './interfaces/utils'

export function V(x: number, y: number): Vector {
  let vector = new P5.Vector
  vector.set(x, y)
  return vector
}

export function rgb(r: number, g: number, b: number): RGB {
  return {
    r: r,
    g: g,
    b: b,
  }
}

export function randomUnitVector(): Vector {
  return P5.Vector.random2D()
}

export function distanceVectors(vector1: Vector, vector2: Vector): number {
  return P5.Vector.dist(vector1, vector2)
}
export function vectorDirection(vector1: Vector, vector2: Vector): Vector {
  let newVector = V(vector2.x - vector1.x, vector2.y - vector1.y)
  return newVector.normalize()
}
export function fieldRange(widthfield, heightField): FieldRange {
  return {minX: 0, maxX: widthfield, minY: 0, maxY: heightField}
}
// export function vectorDireccion(from: Vector, target: Vector): Vector {
//   if (from.x === target.x && from.y === target.y) {
//       return V(0,0)
//   }
//   const newx = target.x - from.x
//   const newy = target.y - from.y
//   const norm = longitud(V(newx, newy))

//   return V(newx/norm, newy/norm)
// }

// export function distancia(from: Player, target: Player) {
//   if (from.getX() === target.getX() && from.getY() === target.getY()) {
//       return 0
//   }
//   const newx = target.getX() - from.getX()
//   const newy = target.getY() - from.getY()
//   return longitud(V(newx, newy))
// }

// export function longitud(vector) {
//   return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
// }

// export function rCanvas() {
//   return Math.round(Math.random() * 350)
// }

// export function signRandom(): number {
//   if (Math.ceil(Math.random() * 100) + 1 > 50) {
//     return 1
//   }
//   return -1
// }

