export class Order {

  productid: number
  providerid: number
  placedby: String
  quantity: number
  

  constructor(productid: number, providerid: number, placedby: String, quantity: number) {
    this.productid = productid
    this.providerid = providerid
    this.placedby = placedby
    this.quantity = quantity
  }
}
