/**
 * Created by Xavier on 01.05.18.
 */
import {Supplier} from './Supplier'

export class Product {

  id: number
  productName: string
  price: number           // this is the price by unit
  unit: string            // typically: kg, piece, 100g
  stock: number           // number of units
  image64: string         // base64 encoded image
  suppliers: Supplier[]   // Who's providing the stuff
  isDirty: boolean


  constructor(id: number, productName: string, price: number, unit: string, stock: number, image64: string) {
    this.id = id
    this.productName = productName
    this.price = price
    this.unit = unit
    this.stock = stock
    this.image64 = image64
    this.suppliers = [] // must be done to avoid a push on null
    this.isDirty = false // indicates that changes have been made in the details page
  }

  addSupplier(sup: Supplier) {
    this.suppliers.push(sup)
  }

  // Allows to check for equality of content
  equalsProduct(p: Product) {
    return (
      (this.productName == p.productName) &&
      (this.price == p.price) &&
      (this.unit == p.unit) &&
      (this.stock == p.stock)
    )

    // Note: suppliers are kept out of the test for now, but it's a tricky one.
    // Consider the case where you remove a supplier and the add new one before you leave ...
    // Lists would be the same length, content different.
    // Worse: Lists could end up identical although ordered differently

  }
}
