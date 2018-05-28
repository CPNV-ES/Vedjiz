import { User } from './User'

export class Supplier extends User {
  private _name: string

  constructor(id:number, firstName:string, lastName:string, phone:string, address:string, name:string) {
    super(id, firstName, lastName, phone, address)
    this.name = name
  }

  set name(name:string) {
    this._name = name
  }

  get name(): string {
    return this._name
  }
}