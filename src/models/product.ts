import { Supplier } from './supplier';

export class Product {
  id: number
  productName: string
  price: number
  unit: string
  stock: number
  imageFileName: string
  suppliers: Array<Supplier>

  constructor(id: number, productName: string, price: number, unit: string, stock: number, imageFileName: string, suppliers: Array<Supplier> = []) {
    this.id = id
    this.productName = productName
    this.price = price
    this.unit = unit
    this.stock = stock
    this.imageFileName = imageFileName
    this.suppliers = suppliers
  }

}