import {
  RGB,
} from '../interfaces/utils'

export class rgb implements RGB{
  constructor(
    public r: number,
    public g: number,
    public b: number
  ){}
}