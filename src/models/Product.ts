/**
 * Created by Xavier on 01.05.18.
 */
import {Supplier} from 'Supplier.ts'

export class Product {

  productName: string;
  price: number; // this is the price by unit
  unit: string;
  stock: number;
  imageFileName: string;
  suppliers: Supplier[];

  constructor(productName: string, price: number, unit: string, stock: number, imageFileName: string) {
    this.productName = productName;
    this.price = price;
    this.unit = unit;
    this.stock = stock;
    this.imageFileName = imageFileName;
  }

}
