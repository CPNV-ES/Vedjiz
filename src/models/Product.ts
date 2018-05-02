/**
 * Created by Xavier on 01.05.18.
 */
import {Supplier} from './Supplier'

export class Product {

  productName: string;
  price: number;          // this is the price by unit
  unit: string;           // typically: kg, piece, 100g
  stock: number;          // number of units
  imageFileName: string;
  suppliers: Supplier[];  // Who's providing the stuff


  constructor(productName: string, price: number, unit: string, stock: number, imageFileName: string) {
    this.productName = productName;
    this.price = price;
    this.unit = unit;
    this.stock = stock;
    this.imageFileName = imageFileName;
    this.suppliers = []; // must be done to avoid a push on null
  }

  addSupplier (sup: Supplier) {
    this.suppliers.push(sup);
  }

}
