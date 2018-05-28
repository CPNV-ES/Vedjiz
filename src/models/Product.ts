import { Supplier } from './Supplier'

export class Product {
  private _id: number
  private _name: string
  private _price: number
  private _unit: string
  private _suppliers: Array<Supplier>
  private _path: string
  private _stock: number

  constructor(id:number, name:string, price:number, unit:string, suppliers:Array<Supplier>, path: string, stock: number) {
    this.id = id
    this.name = name
    this.price = price
    this.unit = unit
    this.suppliers = suppliers
    this.path = path
    this.stock = stock
  }

  update(name, price, unit, stock, path) {
    this.name = name
    this.price = price
    this.unit = unit
    this.stock = stock
    this.path = path
  }

  set name(name:string) {
    this._name = name
  }

  get name(): string {
    return this._name
  }

  set price(price:number) {
    this._price = price
  }

  get price(): number {
    return this._price
  }

  set unit(unit:string) {
    this._unit = unit
  }

  get unit(): string {
    return this._unit
  }

  set suppliers(suppliers:Array<Supplier>) {
    this._suppliers = suppliers
  }

  get suppliers(): Array<Supplier> {
    return this._suppliers
  }

  set path(path:string) {
    this._path = path
  }

  get path(): string {
    return this._path
  }

  set stock(stock:number) {
    this._stock = stock
  }

  get stock(): number {
    return this._stock
  }

  set id(id) {
    this._id = id
  }

  get id(): number {
    return this._id
  }
}