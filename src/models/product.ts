import { Supplier } from './supplier';

export class Product {
  productName: string
  price: number
  unit: string
  stock: number
  imageFileName: string
  suppliers: Array<Supplier>

  constructor(productName: string, price: number, unit: string, stock: number, imageFileName: string, suppliers: Array<Supplier> = []) {
    this.productName = productName
    this.price = price
    this.unit = unit
    this.stock = stock
    this.imageFileName = imageFileName
    this.suppliers = suppliers
  }

}