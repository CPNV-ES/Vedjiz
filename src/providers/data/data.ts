import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { User } from '../../models/user';
import { Product } from '../../models/product';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  suppliers: Array<Supplier>
  users: Array<User>
  products: Array<Product>

  constructor(public http: HttpClient) {
    this.suppliers = [new Supplier('Gégé', 'Roulat', '+41798522407', 'Impasse des Burtins 5', 'ButoxxDev'), new Supplier('Bernard', 'Marcel', '+41798522507', 'Impasse des clampins 5', 'NicoDev')]
    this.products = [new Product('Carotte', 19.50, 'kg', 6, 'carots.jpg', this.suppliers), new Product('Brocoli', 25.20, 'kg', 20, 'Broccoli.jpeg', this.suppliers), new Product('Asperge', 12,'kg',153,'asparagus.jpg',[])]
  }

  getVersionNumber() {
    return "1.0"
  }

  getProducts() {
    return this.products
  }

  getFirstProduct() {
    return this.products[0]
  }
}
