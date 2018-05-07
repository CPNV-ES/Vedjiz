import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Supplier } from '../../models/supplier';
import { DataProvider } from '../../providers/data/data';
import { ProductPage } from '../product/product';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Array<Product>

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.products = dataProvider.getProducts()
  }

  openProduct(product) {
    this.navCtrl.push(ProductPage, {'product': product})
  }
}
